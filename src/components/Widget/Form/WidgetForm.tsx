import React, { useRef, useState } from "react";

import Drawer from "../../common/Drawer";
import Button from "../../common/Button";
import Form from "../../common/Form";
import ImageUpload from "../../common/ImageUpload";
import TileItemsAccordian from "./TileItemsAccordian";

import { useWidgetState } from "../../../context/WidgetContext";
import { useProviderState } from "../../../context/ProviderContext";
import { capitalizeFirstLetter, changeToCode } from "../../../helper/utils";

const MasterForm = ({ onClose, open, formState }: FormProps) => {
	const { baseUrl } = useProviderState();
	const {
		t,
		onWidgetFormSubmit,
		data,
		tilesList,
		tilesLoading,
		onTileFormSubmit,
		onDeleteTile,
		onImageRemove,
		onImageUpload,
	} = useWidgetState();
	const [webShow, setWebShow] = useState(false);
	const [mobileShow, setMobileShow] = useState(false);
	const widgetFormRef = useRef<HTMLFormElement | null>(null);

	// Form Utility Functions
	function handleCapitalize(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = capitalizeFirstLetter(event.target.value);
		return event;
	}
	function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = changeToCode(event.target.value);
		return event;
	}

	// Widget Form Functions
	const onWidgetFormSubmitClick = () => {
		widgetFormRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
	};

	// Schemas
	const widgetFormSchema: SchemaType[] = [
		{
			label: `${t("widget.name")}`,
			required: true,
			accessor: "name",
			type: "text",
			placeholder: t("widget.namePlaceholder"),
			onInput: handleCapitalize,
			validations: {
				required: t("widget.nameRequired"),
			},
		},
		{
			label: `${t("widget.code")}`,
			accessor: "code",
			required: true,
			type: "text",
			onInput: handleCode,
			editable: false,
			placeholder: t("widget.codePlaceholder"),
			validations: {
				required: t("widget.codeRequired"),
			},
		},
		{
			label: `${t("widget.type")}`,
			required: true,
			accessor: "cardType",
			type: "select",
			validations: {
				required: t("widget.typeRequired"),
			},
			options: [
				{ label: "Fixed", value: "Fixed" },
				{ label: "Slider", value: "Slider" },
			],
		},
		{
			label: t("widget.webPerRow"),
			accessor: "webPerRow",
			type: "number",
			placeholder: t("widget.webPerRowPlaceholder"),
		},
		{
			label: t("widget.mobilePerRow"),
			accessor: "mobilePerRow",
			type: "number",
			placeholder: t("widget.mobilePerRowPlaceholder"),
		},
	];
	const tileFormSchema: SchemaType[] = [
		{
			label: `${t("tile.title")}`,
			required: true,
			accessor: "title",
			type: "text",
			placeholder: t("tile.titlePlaceholder"),
		},
		{
			label: `${t("tile.altText")}`,
			accessor: "altText",
			type: "text",
			placeholder: t("tile.altTextPlaceholder"),
		},
		{
			label: `${t("tile.link")}`,
			required: true,
			accessor: "link",
			type: "url",
			placeholder: t("tile.linkPlaceholder"),
		},
		{
			label: t("tile.image"),
			accessor: "img",
			Input: ({ field, error, setError }) => (
				<ImageUpload
					imgId={field.value}
					maxSize={10_485_760}
					onError={setError}
					error={error}
					setImgId={(value) => {
						field.onChange(value);
					}}
					baseUrl={baseUrl}
					text={
						<>
							<div className="khb_img-text-wrapper">
								<label htmlFor="file-upload" className="khb_img-text-label">
									<span>{t("tile.uploadFile")}</span>
								</label>
								<p className="khb_img-text-1">{t("tile.dragDrop")}</p>
							</div>
							<p className="khb_img-text-2">{t("tile.allowedFormat")}</p>
						</>
					}
					onImageUpload={onImageUpload}
					onImageRemove={onImageRemove}
					className="khb_img-upload-wrapper-3"
				/>
			),
		},
	];

	return (
		<Drawer
			open={open}
			onClose={onClose}
			title={formState === "ADD" ? "Add Widget" : formState === "UPDATE" ? "Update Widget" : ""}
			footerContent={
				<>
					<Button type="secondary" onClick={onClose}>
						{t("cancelButtonText")}
					</Button>
					<Button onClick={onWidgetFormSubmitClick}>{t("saveButtonText")}</Button>
				</>
			}
		>
			<div className="khb_form">
				<Form
					schema={widgetFormSchema}
					onSubmit={onWidgetFormSubmit}
					ref={widgetFormRef}
					data={data}
					isUpdating={formState === "UPDATE"}
				/>

				{/* Web Items */}
				<TileItemsAccordian
					collapseId="webItems"
					title={t("widget.webItems")}
					id="web"
					schema={tileFormSchema}
					show={webShow}
					tilesData={tilesList.web}
					toggleShow={setWebShow}
					onDataSubmit={onTileFormSubmit}
					tileType="Web"
					widgetId={data?._id}
					onDelete={onDeleteTile}
					cancelText={t("cancelButtonText")}
					saveText={t("saveButtonText")}
					editText={t("editButtonText")}
					deleteText={t("deleteButtonText")}
				/>

				{/* Mobile Items */}
				<TileItemsAccordian
					collapseId="mobileItems"
					title={t("widget.mobileItems")}
					id="mobile"
					schema={tileFormSchema}
					show={mobileShow}
					tilesData={tilesList.mobile}
					toggleShow={setMobileShow}
					onDataSubmit={onTileFormSubmit}
					tileType="Mobile"
					widgetId={data?._id}
					onDelete={onDeleteTile}
					cancelText={t("cancelButtonText")}
					saveText={t("saveButtonText")}
					editText={t("editButtonText")}
					deleteText={t("deleteButtonText")}
				/>
			</div>
		</Drawer>
	);
};;;

export default MasterForm;
