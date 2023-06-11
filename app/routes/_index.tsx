import { Suspense } from "react";
import { defer, type LoaderArgs } from "@remix-run/node";
import {
	Await,
	useLoaderData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { fetchClips } from "~/lib/clips.server";
import ClipTableError from "~/components/ClipTableError";
import ClipTable from "~/components/clip-table/ClipTable";
import type { ClipsResponse } from "~/lib/types/clips";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export async function loader({ request }: LoaderArgs) {
	const url = new URL(request.url);
	const broadcasterName = url.searchParams.get("broadcasterName");
	return defer({ clipData: fetchClips(broadcasterName) });
}

export default function IndexRoute() {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const [searchParams] = useSearchParams();
	const broadcasterName = searchParams.get("broadcasterName");
	const isLoading = navigation.state === "loading";
	return (
		<div className="flex flex-col container mx-auto font-sans h-screen">
			<div className="absolute top-0 left-0 w-full h-40 bg-violet-800 -z-50" />
			<Header />
			{!broadcasterName && navigation.state === "idle" && (
				<div
					className={`flex flex-col flex-1 justify-center items-center my-4 rounded-md bg-slate-50 border-slate-300 border h-full w-full`}
				>
					<h2 className="text-4xl">Welcome!</h2>
					<p>
						Enter a streamer's name above to search for clips on their channel.
					</p>
					<p className="italic">
						(Patience - channels with many clips may take a while to load!)
					</p>
				</div>
			)}
			{(broadcasterName || isLoading) && (
				<>
					{isLoading && <LoadingSpinner />}
					{!isLoading && (
						<Suspense fallback={<LoadingSpinner />}>
							<Await
								resolve={data.clipData}
								errorElement={<ClipTableError broadcasterName="" />}
								children={(data) => {
									const clipData = data as unknown as ClipsResponse;
									return (
										<div
											className={`min-h-0 my-4 flex flex-col flex-1 rounded-md bg-slate-50 border-slate-300 border h-full w-full`}
										>
											<ClipTable clips={clipData.clips} />
										</div>
									);
								}}
							/>
						</Suspense>
					)}
				</>
			)}
			<Footer />
		</div>
	);
}
