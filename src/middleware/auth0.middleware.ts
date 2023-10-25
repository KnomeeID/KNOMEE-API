import { NextFunction, Request, Response } from 'express';
import {
	auth,
	claimCheck,
	InsufficientScopeError,
} from 'express-oauth2-jwt-bearer';

export const validateAccessToken = auth({
	issuerBaseURL: `https://${environment.auth0Domain}`,
	audience: environment.auth0Audience,
});

export const checkRequiredPermissions =
	(requiredPermissions: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		const permissionCheck = claimCheck((payload) => {
			const permissions = payload.permissions as string[];

			const hasPermissions = requiredPermissions.every(
				(requiredPermission) =>
					permissions.includes(requiredPermission),
			);

			if (!hasPermissions) {
				throw new InsufficientScopeError();
			}

			return hasPermissions;
		});

		permissionCheck(req, res, next);
	};

export const checkIfItIsTheUser =
	() => (request: Request, response: Response, next: NextFunction) => {
		if (request.body.userId == null) {
			throw new Error('userId not found in request body as expected');
		} else {
			const userId = request.body.userId || '';
			return (req: Request, res: Response, next2: NextFunction) => {
				const permissionCheck = claimCheck((payload) => {
					const isUser = payload.sub === userId;
					const hasPermissions = isUser; // || or is admin

					if (!hasPermissions) {
						throw new InsufficientScopeError();
					}

					return hasPermissions;
				});

				permissionCheck(req, res, next2);
			};
		}
	};
