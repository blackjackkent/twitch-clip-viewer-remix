const dropdownFilterFn = (row, columnId, filterValue) => {
	if (filterValue === "All") {
		return true;
	}
	if (filterValue === "Unspecified" && row.getValue(columnId) === undefined) {
		return true;
	}
	return row.getValue(columnId) === filterValue;
};
export default dropdownFilterFn;
