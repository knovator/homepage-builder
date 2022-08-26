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
	formatOptionLabel,
	listCode,
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
				// @ts-ignore
				value={selectedOptions}
				// @ts-ignore
				onChange={onChange}
				className={classNames(className)}
				isMulti={isMulti}
				// @ts-ignore
				options={options}
				isSearchable={isSearchable}
				isLoading={isLoading}
				onKeyDown={(e) => onSearch && onSearch((e.target as HTMLInputElement).value)}
				placeholder={placeholder}
				formatOptionLabel={formatOptionLabel ? (option) => formatOptionLabel(listCode!, option) : undefined}
			/>
			{error && <p className="khb_input-error ">{error}</p>}
		</div>
	);
};

export default CustomReactSelect;
