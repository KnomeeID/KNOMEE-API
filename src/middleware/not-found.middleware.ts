import { NextFunction, Request, Response } from 'express';

const notFoundHandler = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const message = 'Not Found';

	response.status(404).json({ message });
};

export default notFoundHandler;
