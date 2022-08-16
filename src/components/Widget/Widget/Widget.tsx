import React, { useState } from "react";
import Table from "../Table";
import Pagination from "../Pagination";
import MasterForm from "../Form";
import useWidget from "../../../hooks/useWidget";
import WidgetContextProvider from "../../../context/WidgetContext";
import AddButton from "../AddButton";
import { createTranslation } from "../../../helper/utils";
import { TRANSLATION_PAIRS_COMMON, TRANSLATION_PAIRS_WIDGET, TRANSLATION_PAIRS_TILES } from "../../../constants/common";

const Widget = ({ t }: WidgetProps) => {
	const derivedT = createTranslation(t, {
		...TRANSLATION_PAIRS_COMMON,
		...TRANSLATION_PAIRS_WIDGET,
		...TRANSLATION_PAIRS_TILES,
	});
	const {
		list,
		loading,
		onChangeFormState,
		formState,
		onCloseForm,
		onWidgetFormSubmit,
		itemData,
		// Pagination
		totalPages,
		totalRecords,
		currentPage,
		pageSize,
		setCurrentPage,
	} = useWidget({
		defaultLimit: 10,
	});
	return (
		<WidgetContextProvider
			loading={loading}
			list={list}
			onChangeFormState={onChangeFormState}
			t={derivedT}
			onWidgetFormSubmit={onWidgetFormSubmit}
			data={itemData}
			// Pagination
			totalPages={totalPages}
			totalRecords={totalRecords}
			currentPage={currentPage}
			pageSize={pageSize}
			setCurrentPage={setCurrentPage}
		>
			<AddButton />
			<div className="khb_table-wrapper">
				<Table />
				<Pagination />
			</div>
			<MasterForm
				open={formState === "ADD" || formState === "UPDATE"}
				onClose={onCloseForm}
				formState={formState}
			/>
		</WidgetContextProvider>
	);
};

export default Widget;
