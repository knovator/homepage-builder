import React from "react";
import { useWidgetState } from "../../../context/WidgetContext";
import Table from "../../common/Table";

const WidgetTable = () => {
	const { list, onChangeFormState } = useWidgetState();
	const onUpdateClick = (item: any) => onChangeFormState("UPDATE", item);
	const onDeleteClick = (item: any) => onChangeFormState("DELETE", item);
	return (
		<Table
			data={list}
			dataKeys={[
				{ label: "Name", dataKey: "name", highlight: true },
				{ label: "Code", dataKey: "code" },
			]}
			actions={{
				edit: onUpdateClick,
				delete: onDeleteClick,
			}}
		/>
	);
};
export default WidgetTable;
