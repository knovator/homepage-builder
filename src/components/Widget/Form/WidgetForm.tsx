import React, { useRef, useState } from "react";
import Drawer from "../../common/Drawer";
import Button from "../../common/Button";
import Accordian from "../../common/Accordian";
import { useWidgetState } from "../../../context/WidgetContext";
import { capitalizeFirstLetter, changeToCode } from "../../../helper/utils";
import Form from "../../common/Form/Form";

const MasterForm = ({ onClose, open, formState }: FormProps) => {
	const { t, onWidgetFormSubmit, data } = useWidgetState();
	const [webShow, setWebShow] = useState(false);
	const [mobileShow, setMobileShow] = useState(false);
	const [webItemsShow, setWebItemsShow] = useState<boolean[]>([]);
	const [mobileItemsShow, setMobileItemsShow] = useState<boolean[]>([]);
	const widgetFormRef = useRef<HTMLFormElement | null>(null);
	const webTileFormRefs = useRef<(HTMLFormElement | null)[]>([]);
	const mobileTileFormRefs = useRef<HTMLFormElement[] | null[]>([]);

	const onMobileItemsToggleClick = (index: number) => {
		let newMobileItemsShow: boolean[] = [...mobileItemsShow];
		let newStatus = !newMobileItemsShow[index];
		newMobileItemsShow.fill(false);
		newMobileItemsShow[index] = newStatus;
		setMobileItemsShow(newMobileItemsShow);
	};
	const onWebItemsToggleClick = (index: number) => {
		let newWebItemsShow: boolean[] = [...webItemsShow];
		let newStatus = !newWebItemsShow[index];
		newWebItemsShow.fill(false);
		newWebItemsShow[index] = newStatus;
		setWebItemsShow(newWebItemsShow);
	};
	const onWebItemAdd = () => {
		let newWebItemsShow: boolean[] = [...webItemsShow];
		newWebItemsShow.push(false);
		setWebItemsShow(newWebItemsShow);
		webTileFormRefs.current.push(null);
	};
	const onMobileItemAdd = () => {
		let newMobileItemsShow: boolean[] = [...mobileItemsShow];
		newMobileItemsShow.push(false);
		setMobileItemsShow(newMobileItemsShow);
		// mobileTileFormRefs.current.push(null);
	};
	const onWebItemRemove = (index: number) => {
		let newWebItemsShow: boolean[] = [...webItemsShow];
		newWebItemsShow.splice(index, 1);
		setWebItemsShow(newWebItemsShow);
		webTileFormRefs.current.splice(index, 1);
	};
	const onMobileItemRemove = (index: number) => {
		let newMobileItemsShow: boolean[] = [...mobileItemsShow];
		newMobileItemsShow.splice(index, 1);
		setMobileItemsShow(newMobileItemsShow);
		mobileTileFormRefs.current.splice(index, 1);
	};

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
	// Web Tile Forms
	const onWebTileFormSubmitClick = (index: number) => {
		webTileFormRefs.current[index]?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
	};
	const onWebTileFormSubmit = (index: number, data: any) => {
		console.log(`Web tile form data for ${index + 1}`, data);
	};
	// Mobile Tile Forms
	const onMobileTileFormSubmitClick = (index: number) => {
		mobileTileFormRefs.current[index]?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
	};
	const onMobileTileFormSubmit = (index: number, data: any) => {
		console.log(`Mobile tile form data for ${index + 1}`, data);
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
			type: "text",
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
				<Form schema={widgetFormSchema} onSubmit={onWidgetFormSubmit} ref={widgetFormRef} data={data} />

				{/* Web Items */}
				<Accordian
					open={webShow}
					onToggle={() => setWebShow(!webShow)}
					title="Web"
					collapseId="web-content"
					id="web"
					footerContent={
						<Button size="sm" onClick={onWebItemAdd}>
							Add
						</Button>
					}
				>
					<div className="khb_items">
						{webItemsShow.map((status, index) => (
							<Accordian
								key={index}
								open={status}
								onToggle={() => onWebItemsToggleClick(index)}
								title={`Item ${index + 1}`}
								collapseId={`web-item-content-${index}`}
								id={`web-item-${index}`}
								footerContent={
									<>
										<Button type="secondary" size="sm">
											Cancel
										</Button>
										<Button
											type="primary"
											size="sm"
											onClick={() => onWebTileFormSubmitClick(index)}
										>
											Submit
										</Button>
										<Button type="danger" size="sm" onClick={() => onWebItemRemove(index)}>
											Delete
										</Button>
									</>
								}
							>
								<Form
									schema={tileFormSchema}
									onSubmit={(data) => onWebTileFormSubmit(index, data)}
									ref={(el) => (webTileFormRefs.current[index] = el)}
								/>
							</Accordian>
						))}
					</div>
				</Accordian>

				{/* Mobile Items */}
				<Accordian
					open={mobileShow}
					onToggle={() => setMobileShow(!mobileShow)}
					title="Mobile"
					id="mobile"
					collapseId="mobile-content"
					footerContent={
						<Button size="sm" onClick={onMobileItemAdd}>
							Add
						</Button>
					}
				>
					<div className="khb_items">
						{mobileItemsShow.map((status, index) => (
							<Accordian
								key={index}
								open={status}
								onToggle={() => onMobileItemsToggleClick(index)}
								title={`Item ${index + 1}`}
								collapseId={`web-item-content-${index}`}
								id={`web-item-${index}`}
								footerContent={
									<>
										<Button type="secondary" size="sm">
											Cancel
										</Button>
										<Button
											type="primary"
											size="sm"
											onClick={() => onMobileTileFormSubmitClick(index)}
										>
											Submit
										</Button>
										<Button type="danger" size="sm" onClick={() => onMobileItemRemove(index)}>
											Delete
										</Button>
									</>
								}
							>
								<Form
									schema={tileFormSchema}
									onSubmit={(data) => onMobileTileFormSubmit(index, data)}
									ref={(el) => (mobileTileFormRefs.current[index] = el)}
								/>
							</Accordian>
						))}
					</div>
				</Accordian>
			</div>
		</Drawer>
	);
};

export default MasterForm;
