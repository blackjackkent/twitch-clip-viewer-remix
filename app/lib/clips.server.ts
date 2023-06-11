import type { AxiosResponse } from "axios";
import type {
	ClipsApiResponseItem,
	ClipsApiResponse,
	BroadcasterDataApiResponse,
	GamesApiResponse,
	GameIdsDictionary,
	ClipsResponse,
} from "./types/clips";
import getAxiosInstance, { logAxiosError } from "./network.server";
import ClipDto from "./types/ClipDto";
import ClipErrorReason from "./enums/ClipErrorReason";

export const fetchClips = async (
	broadcasterName: string | null
): Promise<ClipsResponse> => {
	if (!broadcasterName) {
		throw new Error(ClipErrorReason.CHANNEL_NOT_FOUND.toString());
	}
	const channel = await getBroadcasterData(broadcasterName);
	const broadcasterId = channel?.id;
	if (!broadcasterId) {
		throw new Error(ClipErrorReason.CHANNEL_NOT_FOUND.toString());
	}
	const clips = await getClipsForBroadcaster(broadcasterId);
	const games = await getGamesForClips(clips);
	const dtoData: ClipDto[] = [];
	clips.forEach((c) => {
		const game = games[c.game_id];
		dtoData.push(new ClipDto(c, game));
	});
	return {
		count: clips.length,
		clips: dtoData,
	};
};

const getBroadcasterData = async (broadcasterName: string) => {
	const axios = await getAxiosInstance();
	const response = await axios.get<BroadcasterDataApiResponse>(
		`https://api.twitch.tv/helix/search/channels?query=${broadcasterName}`
	);
	const channel = response.data.data.find(
		(c) => c.display_name.toUpperCase() === broadcasterName.toUpperCase()
	);
	return channel;
};

const getClipsForBroadcaster = async (broadcasterId: string) => {
	const axios = await getAxiosInstance();
	let data: ClipsApiResponseItem[] = [];
	let isFirstClipLoop = true;
	let cursor = "";
	while (cursor || isFirstClipLoop) {
		isFirstClipLoop = false;
		let queryString = `?broadcaster_id=${broadcasterId}&first=100`;
		if (cursor) {
			queryString += `&after=${cursor}`;
		}
		// eslint-disable-next-line no-await-in-loop
		const response = await axios.get<ClipsApiResponse>(
			`https://api.twitch.tv/helix/clips${queryString}`
		);
		data = data.concat(response.data.data);
		cursor = response.data.pagination.cursor;
	}
	return data;
};

const getGamesForClips = async (clips: ClipsApiResponseItem[]) => {
	const axios = await getAxiosInstance();
	const gameIds = clips.map((c) => c.game_id).filter((c) => c);
	const uniqueGameIds = [...new Set(gameIds)];
	const chunkedGameIds: string[][] = [];
	while (uniqueGameIds.length) {
		chunkedGameIds.push(uniqueGameIds.splice(0, 10));
	}
	const requests: Promise<AxiosResponse<GamesApiResponse, any>>[] = [];
	try {
		for (let i = 0; i < chunkedGameIds.length; i++) {
			const chunk = chunkedGameIds[i];
			const queryString = `?id=${chunk.join("&id=")}`;
			requests.push(
				axios.get<GamesApiResponse>(
					`https://api.twitch.tv/helix/games${queryString}`
				)
			);
		}
		const results = await Promise.all(requests);
		const data: GameIdsDictionary = {};
		results.forEach((resp) => {
			const games = resp.data.data;
			games.forEach((g) => {
				data[g.id] = g;
			});
		});
		return data;
	} catch (e) {
		logAxiosError(e);
		return {};
	}
};
