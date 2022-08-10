import classNames from "classnames";
import React from "react";

const Input = ({ label, id, placeholder, type, size = "base", className }: InputProps) => {
	return (
		<>
			{label ? (
				<label htmlFor={id} className="khb_input-label">
					{label}
				</label>
			) : null}
			<input
				className={classNames("khb_input", `khb_input-${size}`, className)}
				type={type}
				placeholder={placeholder}
				id={id}
			/>
		</>
	);
};

export default Input;
