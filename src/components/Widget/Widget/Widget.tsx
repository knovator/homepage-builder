import React from "react";
import Table from "../../common/Table";
import Pagination from "../../common/Pagination";

const Widget = () => {
	return (
		<div>
			<div className="khb_table-wrapper">
				<Table />
				<Pagination />
			</div>
		</div>
	);
};

export default Widget;
