import React, { useCallback } from "react";
import Table from "../../common/Table";
import ToggleWidget from "../../common/Toggle";
import { useWidgetState } from "../../../context/WidgetContext";

const WidgetTable = () => {
	const { list, onChangeFormState, onPartialUpdateWidget } = useWidgetState();
	const updateClosure = useCallback(
		(item: any, key: string, value: any) => {
			onPartialUpdateWidget({ [key]: value }, item._id);
		},
		[onPartialUpdateWidget],
	);
	const onUpdateClick = (item: any) => onChangeFormState("UPDATE", item);
	const onDeleteClick = (item: any) => onChangeFormState("DELETE", item);
	return (
		<Table
			data={list}
			dataKeys={[
				{ label: "Name", dataKey: "name", highlight: true },
				{ label: "Code", dataKey: "code" },
				{
					label: "Active",
					dataKey: "isActive",
					Cell: ({ row }) => (
						<ToggleWidget
							isChecked={row?.isActive}
							onChange={(status) => updateClosure(row, "isActive", status)}
						/>
					),
				},
			]}
			actions={{
				edit: onUpdateClick,
				delete: onDeleteClick,
			}}
		/>
	);
};
export default WidgetTable;
