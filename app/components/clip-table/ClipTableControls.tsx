import type { Table } from "@tanstack/react-table";
import type ClipDto from "~/lib/types/ClipDto";

type ClipTableControlsProps = {
	table: Table<ClipDto>;
};
const ClipTableControls = ({ table }: ClipTableControlsProps) => {
	return (
		<div className="flex flex-row justify-center items-center bg-slate-200 py-4 text-sm">
			<div className="flex flex-row">
				<button
					className="mx-2 bg-violet-800 text-white rounded-lg py-1 px-2"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					className="mx-2 bg-violet-800 text-white rounded-lg py-1 px-2"
					type="button"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
			</div>
			<div>
				<span>
					Page{" "}
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</span>
			</div>
			<div>
				<span className="mx-4">
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div className="flex flex-row">
				<button
					type="button"
					className="mx-2 bg-violet-800 text-white rounded-lg py-1 px-2"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					type="button"
					className="mx-2 bg-violet-800 text-white rounded-lg py-1 px-2"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
			</div>
		</div>
	);
};
export default ClipTableControls;
