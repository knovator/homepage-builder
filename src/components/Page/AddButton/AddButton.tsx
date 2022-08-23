import React from "react";
import Button from "../../common/Button";
import { usePageState } from "../../../context/PageContext";

const AddButton = () => {
	const { onChangeFormState, t } = usePageState();
	return <Button onClick={() => onChangeFormState("ADD")}>{t("addButtonText")}</Button>;
};

export default AddButton;
