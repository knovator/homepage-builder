import React from "react";
import useWidget from "../../../hooks/useWidget";
import WidgetContextProvider from "../../../context/WidgetContext";
import { createTranslation } from "../../../helper/utils";
import { TRANSLATION_PAIRS_COMMON, TRANSLATION_PAIRS_WIDGET, TRANSLATION_PAIRS_TILES } from "../../../constants/common";

import Table from "../Table";
import WidgetForm from "../Form";
import AddButton from "../AddButton";
import Pagination from "../Pagination";
import WidgetSearch from "../Search";
import DeleteModal from "../../common/DeleteModal";

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
		getWidgets,
		onCofirmDeleteWidget,
		onDeleteTile,
		onImageRemove,
		onImageUpload,
		// Pagination
		totalPages,
		totalRecords,
		currentPage,
		pageSize,
		setCurrentPage,
		// Tile
		tilesList,
		tilesLoading,
		onTileFormSubmit,
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
			onDeleteTile={onDeleteTile}
			getWidgets={getWidgets}
			onImageRemove={onImageRemove}
			onImageUpload={onImageUpload}
			// Pagination
			totalPages={totalPages}
			totalRecords={totalRecords}
			currentPage={currentPage}
			pageSize={pageSize}
			setCurrentPage={setCurrentPage}
			// Tile
			tilesList={tilesList}
			tilesLoading={tilesLoading}
			onTileFormSubmit={onTileFormSubmit}
		>
			<AddButton />
			<WidgetSearch />
			<div className="khb_table-wrapper">
				<Table />
				<Pagination />
			</div>
			<WidgetForm
				open={formState === "ADD" || formState === "UPDATE"}
				onClose={onCloseForm}
				formState={formState}
			/>
			<DeleteModal
				formState={formState}
				itemData={itemData}
				onClose={onCloseForm}
				onConfirmDelete={onCofirmDeleteWidget}
			/>
		</WidgetContextProvider>
	);
};

export default Widget;
