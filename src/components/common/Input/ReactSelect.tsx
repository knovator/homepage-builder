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
	isLoading,
	isSearchable,
	onSearch,
	placeholder,
	wrapperClassName,
}: ReactSelectProps) => {
	return (
		<div className={wrapperClassName}>
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
				isSearchable={isSearchable}
				isLoading={isLoading}
				onKeyDown={(e) => onSearch && onSearch((e.target as HTMLInputElement).value)}
				placeholder={placeholder}
			/>
			{error && <p className="khb_input-error ">{error}</p>}
		</div>
	);
};

export default CustomReactSelect;
