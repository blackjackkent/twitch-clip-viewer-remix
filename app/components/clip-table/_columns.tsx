import { createColumnHelper } from "@tanstack/table-core";
import { DateTime } from "luxon";
import dropdownFilterFn from "../../lib/utilities/dropdownFilterFn";
import type ClipDto from "~/lib/types/ClipDto";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { Image } from "remix-image";

const columnHelper = createColumnHelper<ClipDto>();

const columns = [
	columnHelper.accessor((row) => row.thumbnailUrl, {
		id: "thumbnail",
		cell: (info) => (
			<div className="p-3">
				<Image
					width={180}
					height={101}
					alt={info.row.original.game?.name}
					src={info.getValue()}
				/>
			</div>
		),
		enableColumnFilter: false,
		header: "",
		enableSorting: false,
	}),
	columnHelper.accessor((row) => row.title, {
		id: "title",
		cell: (info) => (
			<div className="p-3">
				<p className="font-bold text-base">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={info.row.original.url}
						className="hover:underline"
					>
						{info.getValue()}{" "}
						<ArrowTopRightOnSquareIcon className="inline h-4 w-4 align-text-bottom" />
					</a>
				</p>
			</div>
		),
		header: () => <span>Title</span>,
	}),
	columnHelper.accessor((row) => row.game?.name, {
		id: "game_name",
		cell: (info) => (
			<div className="pl-3">
				<p className="italic">{info.getValue()}</p>
			</div>
		),
		header: () => <span>Game</span>,
		filterFn: dropdownFilterFn,
		size: 200,
	}),
	columnHelper.accessor((row) => row.createdAt, {
		id: "created_date",
		cell: (info) => {
			const date = DateTime.fromJSDate(new Date(info.getValue()));
			return <div className="p-3">{date.toLocaleString()}</div>;
		},
		header: () => <span>Created Date</span>,
		enableColumnFilter: false,
		size: 150,
	}),
	columnHelper.accessor((row) => row.creatorName, {
		id: "creatorName",
		cell: (creatorName) => (
			<a
				href={`http://www.twitch.tv/${creatorName.getValue()}`}
				target="__blank"
				rel="noopener noreferrer"
				className="p-3"
			>
				{creatorName.getValue()}
			</a>
		),
		header: () => <span>Creator Name</span>,
		filterFn: dropdownFilterFn,
	}),
];
export default columns;
