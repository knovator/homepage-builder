import React from "react";
import Pencil from "../../../icons/pencil";
import Trash from "../../../icons/trash";
import Button from "../Button";

const Table = () => {
	return (
		<table className="khb_table">
			<thead className="khb_table-thead">
				<tr>
					<th scope="col" className="khb_table-heading">
						Product name
					</th>
					<th scope="col" className="khb_table-heading">
						Color
					</th>
					<th scope="col" className="khb_table-heading">
						Category
					</th>
					<th scope="col" className="khb_table-heading">
						Price
					</th>
					<th scope="col" className="khb_table-heading">
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				<tr className="khb_table-row">
					<th scope="row" className="khb_table-row-heading">
						Apple MacBook Pro 17"
					</th>
					<td className="khb_table-row-data">Sliver</td>
					<td className="khb_table-row-data">Laptop</td>
					<td className="khb_table-row-data">$2999</td>
					<td className="khb_table-row-actions">
						<Button size="xs">
							<Pencil />
						</Button>
						<Button size="xs" type="danger">
							<Trash />
						</Button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Table;
