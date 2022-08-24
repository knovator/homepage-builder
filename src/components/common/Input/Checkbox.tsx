import React from "react";
import classNames from "classnames";

const Checkbox = ({ rest, label, error, className, disabled }: CheckboxProps) => {
	return (
		<div className="khb_input-wrapper">
			{label && <label className="khb_input-label">{label}</label>}
			<label className="khb_switch" data-testid="khb_switch">
				<input type="checkbox" disabled={disabled} {...rest} />
				<span className="slider round" />
			</label>
			{error && <p className="khb_input-error">{error}</p>}
		</div>
	);
};

export default Checkbox;
