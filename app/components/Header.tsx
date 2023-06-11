import { Form } from "@remix-run/react";

const Header = () => {
	return (
		<div className="flex flex-col lg:flex-row px-8 justify-between mt-4">
			<h1 className="text-4xl font-bold text-slate-50">
				<a href="/">Twitch Clip Search</a>
			</h1>
			<div className="flex mt-4 lg:mt-0 flex-row items-center">
				<Form method="get" className="flex flex-row items-center justify-right">
					<label htmlFor="broadcasterName" className="mr-2 text-slate-50">
						Search for a streamer's clips:
					</label>
					<input
						type="text"
						name="broadcasterName"
						placeholder="Streamer Channel Name"
						className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
					/>
					<button
						className="rounded-md bg-slate-50 py-2 px-3 text-violet-800"
						type="submit"
					>
						Submit
					</button>
				</Form>
			</div>
		</div>
	);
};
export default Header;
