import React from "react";
import Pencil from "../../../icons/pencil";
import Trash from "../../../icons/trash";
import Button from "../Button";

const Table = ({ data, dataKeys, actions }: TableProps) => {
	const cellItemRenderer = (item: any, dataKey: TableDataItemFormat, index: number) => {
		if (dataKey.highlight)
			return (
				<th scope="row" className="khb_table-row-heading" key={index}>
					{item[dataKey.dataKey]}
				</th>
			);
		else if (dataKey.Cell)
			return (
				<td className="khb_table-row-data" key={index}>
					{dataKey.Cell({ row: item })}
				</td>
			);
		else
			return (
				<td className="khb_table-row-data" key={index}>
					{item[dataKey.dataKey]}
				</td>
			);
	};
	return (
		<table className="khb_table">
			<thead className="khb_table-thead">
				<tr>
					{dataKeys.map((key, i) => (
						<th scope="col" className="khb_table-heading" key={i}>
							{key.label}
						</th>
					))}
					{actions && (actions?.edit || actions?.delete) && (
						<th scope="col" className="khb_table-heading">
							Actions
						</th>
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((item: any, i: number) => (
					<tr className="khb_table-row" key={item.id || item._id || i}>
						{dataKeys.map((key, j) => cellItemRenderer(item, key, j))}
						{actions && (
							<td className="khb_table-row-actions">
								{actions.edit && (
									<Button size="xs" onClick={() => actions.edit!(item)}>
										<Pencil />
									</Button>
								)}
								{actions.delete && (
									<Button size="xs" type="danger" onClick={() => actions.delete!(item)}>
										<Trash />
									</Button>
								)}
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
