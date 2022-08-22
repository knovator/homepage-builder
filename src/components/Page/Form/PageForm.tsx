import React, { useRef } from "react";

import Drawer from "../../common/Drawer";
import Button from "../../common/Button";
import Form from "../../common/Form";

import { usePageState } from "../../../context/PageContext";
import { capitalizeFirstLetter, changeToCode } from "../../../helper/utils";

const PageForm = ({ onClose, open, formState }: FormProps) => {
	const { t, data, onPageFormSubmit } = usePageState();
	const pageFormRef = useRef<HTMLFormElement | null>(null);

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
	const onPageFormSubmitClick = () => {
		pageFormRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
	};

	// Schemas
	const pageFormSchema: SchemaType[] = [
		{
			label: `${t("page.name")}`,
			required: true,
			accessor: "name",
			type: "text",
			placeholder: t("page.namePlaceholder"),
			onInput: handleCapitalize,
			validations: {
				required: t("page.nameRequired"),
			},
		},
		{
			label: `${t("page.code")}`,
			accessor: "code",
			required: true,
			type: "text",
			onInput: handleCode,
			editable: false,
			placeholder: t("page.codePlaceholder"),
			validations: {
				required: t("page.codeRequired"),
			},
		},
	];

	return (
		<Drawer
			open={open}
			onClose={onClose}
			title={
				formState === "ADD" ? t("page.addPageTitle") : formState === "UPDATE" ? t("page.updatePageTitle") : ""
			}
			footerContent={
				<>
					<Button type="secondary" onClick={onClose}>
						{t("cancelButtonText")}
					</Button>
					<Button onClick={onPageFormSubmitClick}>{t("saveButtonText")}</Button>
				</>
			}
		>
			<div className="khb_form">
				<Form
					schema={pageFormSchema}
					onSubmit={onPageFormSubmit}
					ref={pageFormRef}
					data={data}
					isUpdating={formState === "UPDATE"}
				/>
			</div>
		</Drawer>
	);
};

export default PageForm;
