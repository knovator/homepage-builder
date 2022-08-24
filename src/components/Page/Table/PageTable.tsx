import React from "react";
import { usePageState } from "../../../context/PageContext";
import Table from "../../common/Table";

const PageTable = () => {
	const { list, canList, onChangeFormState, t, loading, loader, canUpdate, canDelete } = usePageState();
	const onUpdateClick = (item: any) => onChangeFormState("UPDATE", item);
	const onDeleteClick = (item: any) => onChangeFormState("DELETE", item);

	if (Array.isArray(list) && canList) {
		return (
			<Table
				data={list}
				loader={loader}
				loading={loading}
				dataKeys={[
					{ label: t("page.tableName"), dataKey: "name", highlight: true },
					{ label: t("page.tableCode"), dataKey: "code" },
				]}
				actions={{
					edit: canUpdate ? onUpdateClick : undefined,
					delete: canDelete ? onDeleteClick : undefined,
				}}
			/>
		);
	}
	return null;
};
export default PageTable;
