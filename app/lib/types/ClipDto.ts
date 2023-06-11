import type { ClipsApiResponseItem, GamesApiResponseItem } from "./clips";

class ClipDto {
	id: string;
	broadcasterName: string;
	creatorName: string;
	game: GamesApiResponseItem;
	title: string;
	viewCount: number;
	createdAt: Date;
	thumbnailUrl: string;
	url: string;
	embedUrl: string;
	constructor(
		clipApiObject: ClipsApiResponseItem,
		gameApiObject: GamesApiResponseItem
	) {
		this.id = clipApiObject.id;
		this.broadcasterName = clipApiObject.broadcaster_name;
		this.creatorName = clipApiObject.creator_name;
		this.game = gameApiObject;
		this.title = clipApiObject.title;
		this.viewCount = clipApiObject.view_count;
		this.createdAt = new Date(clipApiObject.created_at);
		this.thumbnailUrl = clipApiObject.thumbnail_url;
		this.url = clipApiObject.url;
		this.embedUrl = clipApiObject.embed_url;
	}
}
export default ClipDto;
