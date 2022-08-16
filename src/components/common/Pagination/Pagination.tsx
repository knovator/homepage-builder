import React, { useState } from "react";
import ChevronLeft from "../../../icons/chevronLeft";
import ChevronRight from "../../../icons/chevronRight";
import Button from "../Button";
import Input from "../Input";

const Pagination = ({ currentPage, pageSize, totalPages, totalRecords, setCurrentPage }: PaginationProps) => {
	const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
	const updatePagination = () => {
		let newValue: number | string | undefined = localCurrentPage;
		if (newValue) {
			if (newValue <= 0) {
				newValue = 1;
			} else if (newValue > totalPages) {
				newValue = totalPages;
			}
			setCurrentPage(newValue);
			setLocalCurrentPage(newValue);
		}
	};
	return (
		<nav className="khb_pagination" aria-label="Table navigation">
			<span className="khb_pagination-total">
				Showing <span className="khb_pagination-total-showing">{(currentPage - 1) * pageSize + 1}</span> -{" "}
				<span className="khb_pagination-total-showing">{Math.min(currentPage * pageSize, totalRecords)}</span>{" "}
				of {totalRecords}
			</span>
			<ul className="khb_pagination-actions">
				<Button size="xs" type="secondary" disabled={currentPage - 1 === 0}>
					<ChevronLeft srText="Previous" />
				</Button>
				<div className="khb_pagination-pager">
					Page{" "}
					<Input
						className="mx-2"
						size="xs"
						type="number"
						id="page"
						value={localCurrentPage}
						onChange={(e) => setLocalCurrentPage(Number(e.target.value))}
						onBlur={updatePagination}
					/>{" "}
					/ {totalPages}
				</div>
				<Button size="xs" type="secondary" disabled={currentPage === totalPages}>
					<ChevronRight srText="Next" />
				</Button>
			</ul>
		</nav>
	);
};

export default Pagination;
