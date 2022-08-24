import React from "react";
import { usePageState } from "../../../context/PageContext";
import Table from "../../common/Table";

const PageTable = () => {
	const { list, onChangeFormState, loading, loader } = usePageState();
	const onUpdateClick = (item: any) => onChangeFormState("UPDATE", item);
	const onDeleteClick = (item: any) => onChangeFormState("DELETE", item);

	return (
		<Table
			data={list}
			loader={loader}
			loading={loading}
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
export default PageTable;
