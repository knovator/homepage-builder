import React from "react";
import classNames from "classnames";
import ReactSelect from "react-select";

const CustomReactSelect = ({
	onChange,
	label,
	error,
	options = [],
	className,
	isMulti,
	selectedOptions = [],
	required,
}: ReactSelectProps) => {
	return (
		<div>
			{label && (
				<label className="khb_input-label">
					{label}
					{required ? <span className="khb_input-label-required">*</span> : null}
				</label>
			)}
			<ReactSelect
				data-testid={`input-select-${label}`}
				value={selectedOptions}
				// @ts-ignore
				onChange={onChange}
				className={classNames(className)}
				isMulti={isMulti}
				options={options}
			/>
			{error && <p className="khb_input-error ">{error}</p>}
		</div>
	);
};

export default CustomReactSelect;
