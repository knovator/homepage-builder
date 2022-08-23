import React from "react";
import usePage from "../../../hooks/usePage";
import { createTranslation } from "../../../helper/utils";
import PageContextProvider from "../../../context/PageContext";
import { TRANSLATION_PAIRS_COMMON, TRANSLATION_PAIRS_PAGE } from "../../../constants/common";

import Table from "../Table";
import PageForm from "../Form";
import AddButton from "../AddButton";
import Pagination from "../Pagination";
import DeleteModal from "../../common/DeleteModal";

const Page = ({ t }: PageProps) => {
	const derivedT = createTranslation(t, {
		...TRANSLATION_PAIRS_COMMON,
		...TRANSLATION_PAIRS_PAGE,
	});
	const {
		list,
		widgets,
		loading,
		totalPages,
		totalRecords,
		currentPage,
		pageSize,
		itemData,
		setCurrentPage,
		formState,
		onChangeFormState,
		onPageFormSubmit,
		onCloseForm,
		selectedWidgets,
		setSelectedWidgets,
		onCofirmDeletePage,
		onChangeWidgetSequence,
	} = usePage({
		defaultLimit: 10,
	});

	return (
		<PageContextProvider
			t={derivedT}
			list={list}
			widgets={widgets}
			data={itemData}
			loading={loading}
			totalPages={totalPages}
			totalRecords={totalRecords}
			currentPage={currentPage}
			onChangeFormState={onChangeFormState}
			pageSize={pageSize}
			setCurrentPage={setCurrentPage}
			onPageFormSubmit={onPageFormSubmit}
			selectedWidgets={selectedWidgets}
			setSelectedWidgets={setSelectedWidgets}
			onChangeWidgetSequence={onChangeWidgetSequence}
		>
			<AddButton />
			<div className="khb_table-wrapper">
				<Table />
				<Pagination />
			</div>
			<PageForm
				open={formState === "ADD" || formState === "UPDATE"}
				onClose={onCloseForm}
				formState={formState}
			/>
			<DeleteModal
				formState={formState}
				itemData={itemData}
				onClose={onCloseForm}
				onConfirmDelete={onCofirmDeletePage}
			/>
		</PageContextProvider>
	);
};

export default Page;
