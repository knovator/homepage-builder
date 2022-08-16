import React from "react";
import Button from "../../common/Button";
import { useWidgetState } from "../../../context/WidgetContext";

const AddButton = () => {
	const { onChangeFormState } = useWidgetState();
	return <Button onClick={() => onChangeFormState("ADD")}>Add</Button>;
};

export default AddButton;
