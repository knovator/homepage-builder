import React from "react";
import { useWidgetState } from "../../../context/WidgetContext";
import Pagination from "../../common/Pagination";

const WidgetPagination = () => {
	const { totalPages, totalRecords, currentPage, pageSize, setCurrentPage } = useWidgetState();
	return (
		<Pagination
			totalPages={totalPages}
			totalRecords={totalRecords}
			currentPage={currentPage}
			pageSize={pageSize}
			setCurrentPage={setCurrentPage}
		/>
	);
};

export default WidgetPagination;
