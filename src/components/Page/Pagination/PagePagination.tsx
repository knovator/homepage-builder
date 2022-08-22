import React from "react";
import { usePageState } from "../../../context/PageContext";
import Pagination from "../../common/Pagination";

const PagePagination = () => {
	const { totalPages, totalRecords, currentPage, pageSize, setCurrentPage } = usePageState();
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

export default PagePagination;
