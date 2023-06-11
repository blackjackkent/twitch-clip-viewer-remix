import type { Column } from "@tanstack/react-table";
import React from "react";
import type ClipDto from "~/lib/types/ClipDto";

type FilterProps<T> = {
	column: Column<T>;
};

const Filter = ({ column }: FilterProps<ClipDto>) => {
	if (column.id === "title") {
		return <TextFilter column={column} />;
	}
	return <DropdownFilter column={column} />;
};

const TextFilter = ({ column }: FilterProps<ClipDto>) => {
	const columnFilterValue = column.getFilterValue() as string;
	return (
		<input
			type="text"
			value={columnFilterValue}
			onChange={(e) => {
				column.setFilterValue(e.target.value);
			}}
		/>
	);
};

const DropdownFilter = ({ column }: FilterProps<ClipDto>) => {
	const columnFilterValue = column.getFilterValue() as string;
	const values = column.getFacetedUniqueValues();
	const sortedUniqueValues = React.useMemo(
		() => Array.from(values.keys()).sort(),
		[values]
	);
	const options = sortedUniqueValues.map((v) => {
		if (v === undefined) {
			return (
				<option value={undefined} key="Unspecified">
					Unspecified
				</option>
			);
		}
		return (
			<option value={v} key={v}>
				{v}
			</option>
		);
	});
	return (
		<select
			value={columnFilterValue}
			onChange={(e) => {
				column.setFilterValue(e.target.value);
			}}
			style={{ width: column.getSize() }}
		>
			<option value="All" key="unselected">
				Select...
			</option>
			{options}
		</select>
	);
};
export default Filter;
