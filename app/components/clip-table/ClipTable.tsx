import type { ColumnFilter } from "@tanstack/react-table";
import {
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	getFacetedRowModel,
} from "@tanstack/react-table";
import columns from "./_columns";
import { useState } from "react";
import type ClipDto from "~/lib/types/ClipDto";
import ClipTableControls from "./ClipTableControls";
import ClipTableHeader from "./ClipTableHeader";
import ClipTableBody from "./ClipTableBody";

type ClipTableProps = {
	clips: ClipDto[];
};

const ClipTable = ({ clips = [] }: ClipTableProps) => {
	const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
	const [sorting, setSorting] = useState([{ desc: true, id: "created_date" }]);
	const table = useReactTable({
		data: clips,
		columns,
		state: {
			columnFilters,
			sorting,
		},
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		enableFilters: true,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		enableSortingRemoval: false,
	});

	return (
		<>
			<ClipTableControls table={table} />
			<div className="min-h-0 flex-1 overflow-auto">
				<div className="h-full">
					<table className="w-full ">
						<ClipTableHeader table={table} />
						<ClipTableBody table={table} />
					</table>
				</div>
			</div>
			<ClipTableControls table={table} />
		</>
	);
};
export default ClipTable;
