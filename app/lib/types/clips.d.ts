import ClipErrorReason from "../enums/ClipErrorReason";
import ClipDto from "./ClipDto";

export type BroadcasterDataApiResponse = {
	data: BroadcasterDataApiResponseItem[];
};

export type BroadcasterDataApiResponseItem = {
	id: string;
	display_name: string;
};

export type ClipsApiResponse = {
	pagination: {
		cursor: string;
	};
	data: ClipsApiResponseItem[];
};

export type ClipsApiResponseItem = {
	id: string;
	broadcaster_name: string;
	creator_name: string;
	game_id: string;
	title: string;
	view_count: number;
	created_at: string;
	thumbnail_url: string;
	url: string;
	embed_url: string;
};

export type GamesApiResponse = {
	data: GamesApiResponseItem[];
};

export type GamesApiResponseItem = {
	id: string;
	name: string;
};

export type GameIdsDictionary = {
	[x: string]: GamesApiResponseItem;
};

export type ClipsResponse = {
	count: number;
	clips: ClipDto[];
};
