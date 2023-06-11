import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet, Scripts } from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<title>Twitch Clip Search</title>
				<Links />
			</head>
			<body>
				<Outlet />
				<LiveReload />
				<Scripts />
			</body>
		</html>
	);
}
