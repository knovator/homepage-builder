import React from "react";
import ChevronLeft from "../../../icons/chevronLeft";
import ChevronRight from "../../../icons/chevronRight";
import Button from "../Button";
import Input from "../Input";

const Pagination = () => {
	return (
		<nav className="khb_pagination" aria-label="Table navigation">
			<span className="khb_pagination-total">
				Showing <span className="khb_pagination-total-showing">1-10</span> of{" "}
				<span className="khb_pagination-total-items">1000</span>
			</span>
			<ul className="khb_pagination-actions">
				<Button size="xs" type="secondary">
					<ChevronLeft srText="Previous" />
				</Button>
				<div className="khb_pagination-pager">
					Page <Input className="mx-2" size="xs" type="number" id="page" /> / 10
				</div>
				<Button size="xs" type="secondary">
					<ChevronRight srText="Next" />
				</Button>
			</ul>
		</nav>
	);
};

export default Pagination;
