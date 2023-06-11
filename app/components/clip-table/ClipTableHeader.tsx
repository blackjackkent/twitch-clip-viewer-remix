import { flexRender, type Table } from "@tanstack/react-table";
import type ClipDto from "~/lib/types/ClipDto";
import Filter from "./Filter";

type ClipTableHeaderProps = {
	table: Table<ClipDto>;
};
const ClipTableHeader = ({ table }: ClipTableHeaderProps) => {
	return (
		<thead className="bg-slate-900">
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id} className="mb-3">
					{headerGroup.headers.map((header) => (
						<th
							style={{ width: header.column.getSize() }}
							className="text-left py-3 pl-2"
							key={header.id}
						>
							<div
								tabIndex={0}
								role="button"
								onKeyDown={header.column.getToggleSortingHandler()}
								onClick={header.column.getToggleSortingHandler()}
								className="text-white"
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
								{{
									asc: " 🔼",
									desc: " 🔽",
									none: null,
								}[header.column.getIsSorted() || "none"] ?? null}
							</div>
							<div>
								{header.column.getCanFilter() ? (
									<Filter column={header.column} />
								) : null}
							</div>
						</th>
					))}
				</tr>
			))}
		</thead>
	);
};
export default ClipTableHeader;
