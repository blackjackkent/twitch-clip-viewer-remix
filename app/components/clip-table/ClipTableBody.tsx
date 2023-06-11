import { flexRender, type Table } from "@tanstack/react-table";
import type ClipDto from "~/lib/types/ClipDto";

type ClipTableBodyProps = {
	table: Table<ClipDto>;
};

const ClipTableBody = ({ table }: ClipTableBodyProps) => {
	return (
		<tbody>
			{table.getRowModel().rows.map((row) => (
				<tr key={row.id} className="border-b last:border-b-0">
					{row.getVisibleCells().map((cell) => (
						<td key={cell.id} style={{ width: cell.column.getSize() }}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};
export default ClipTableBody;
