import React, { useRef, useState } from "react";
import Drawer from "../../common/Drawer";
import Button from "../../common/Button";
import { useWidgetState } from "../../../context/WidgetContext";
import { capitalizeFirstLetter, changeToCode } from "../../../helper/utils";
import Form from "../../common/Form";
import TileItemsAccordian from "./TileItemsAccordian";

const MasterForm = ({ onClose, open, formState }: FormProps) => {
	const { t, onWidgetFormSubmit, data } = useWidgetState();
	const [webShow, setWebShow] = useState(false);
	const [mobileShow, setMobileShow] = useState(false);
	const widgetFormRef = useRef<HTMLFormElement | null>(null);

	// Form
	function handleCapitalize(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = capitalizeFirstLetter(event.target.value);
		return event;
	}
	function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
		event.target.value = changeToCode(event.target.value);
		return event;
	}
	// Widget Form
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
				required: t("requiredName"),
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
				required: t("requiredCode"),
			},
		},
		{
			label: `${t("widget.type")}`,
			required: true,
			accessor: "cardType",
			type: "select",
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
			required: true,
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
			label: `${t("tile.image")}`,
			required: true,
			accessor: "file",
			type: "file",
		},
	];
	// \ End of Form

	return (
		<Drawer
			open={open}
			onClose={onClose}
			title={formState === "ADD" ? "Add Widget" : formState === "UPDATE" ? "Update Widget" : ""}
			footerContent={
				<>
					<Button type="danger">Cancel</Button>
					<Button onClick={onWidgetFormSubmitClick}>Submit</Button>
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
					toggleShow={setWebShow}
					onDataSubmit={(index, data) => console.log("web", index, data)}
				/>

				{/* Mobile Items */}
				<TileItemsAccordian
					collapseId="mobileItems"
					title={t("widget.mobileItems")}
					id="mobile"
					schema={tileFormSchema}
					show={mobileShow}
					toggleShow={setMobileShow}
					onDataSubmit={(index, data) => console.log("mobile", index, data)}
				/>
			</div>
		</Drawer>
	);
};

export default MasterForm;
