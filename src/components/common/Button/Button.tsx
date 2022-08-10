import React from "react";
import classNames from "classnames";

const Button = ({ type = "primary", size = "base", onClick = () => {}, children }: ButtonProps) => {
	return (
		<button className={classNames("khb_btn", `khb_btn-${type}`, `khb_btn-${size}`)} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
