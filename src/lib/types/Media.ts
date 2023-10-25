export enum MediaType {
	VIDEO = 'video',
	PICTURE = 'picture',
	GIF = 'gif',
}

export interface MediaAttributes {
	url: string;
	alt?: string;
	caption?: string;
	type: MediaType;
}

export type PictureAttributes = Omit<MediaAttributes, 'type'>;
