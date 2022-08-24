import React, { forwardRef, MutableRefObject, useEffect } from "react";
import { useForm, Controller, EventType } from "react-hook-form";

import Input from "../Input";
import { isEmpty } from "../../../helper/utils";
import CustomReactSelect from "../Input/ReactSelect";

interface FormProps {
	schema: SchemaType[];
	data?: any;
	isUpdating?: boolean;
	onSubmit: (data: any) => void;
	enable?: boolean;
	updates?: any;
	ref: MutableRefObject<HTMLFormElement | null>;
	watcher?: (value: any, name: string | undefined, type: EventType | undefined) => void;
}

const Form = forwardRef<HTMLFormElement | null, FormProps>(
	({ schema, onSubmit, data, isUpdating = false, enable = true, updates, watcher }, ref) => {
		const {
			register,
			formState: { errors },
			handleSubmit,
			reset,
			setValue,
			control,
			setError,
			watch,
		} = useForm({
			defaultValues: data || {},
		});

		React.useEffect(() => {
			if (watcher) {
				const subscription = watch((value, { name, type }) => watcher(value, name, type));
				return () => subscription.unsubscribe();
			}
		}, [watch]);

		useEffect(() => {
			if (updates) {
				Object.keys(updates).forEach((key) => {
					setValue(key, updates[key]);
				});
			}
		}, [updates]);

		// setting default values
		useEffect(() => {
			if (isEmpty(data)) {
				let defaultValues = schema.reduce(
					(values: Record<string, string | number | boolean>, schemaItem: SchemaType) => {
						if (typeof schemaItem.defaultValue !== "undefined")
							values[schemaItem.accessor] = schemaItem.defaultValue;
						return values;
					},
					{},
				);
				reset(defaultValues);
			}
		}, [data, reset, schema]);

		const inputRenderer = (schema: SchemaType) => {
			let input;
			if (typeof schema.show !== "undefined" && !schema.show) return null;
			if (schema.type) {
				switch (schema.type) {
					case "ReactSelect":
						input = (
							<CustomReactSelect
								options={schema.options!}
								disabled={!enable}
								label={schema.label}
								error={errors[schema.accessor]?.message?.toString()}
								onChange={(value) => {
									if (value) {
										setValue(
											schema.accessor,
											value.map((item) => item.value),
										);
										if (schema.onChange) schema.onChange(value);
									}
								}}
								selectedOptions={schema.selectedOptions}
								required={schema.required}
								isMulti={schema.isMulti}
							/>
						);
						break;
					case "checkbox":
						input = (
							<Input.Checkbox
								error={errors[schema.accessor]?.message?.toString()}
								label={schema.label}
								rest={register(schema.accessor, schema.validations || {})}
								className="block"
								disabled={isUpdating && typeof schema.editable !== "undefined" && !schema.editable}
							/>
						);
						break;
					case "select":
						input = (
							<Input.Select
								options={schema.options}
								label={schema.label}
								error={errors[schema.accessor]?.message?.toString()}
								rest={register(schema.accessor, schema.validations || {})}
								className="w-full"
								disabled={
									(isUpdating && typeof schema.editable !== "undefined" && !schema.editable) ||
									!enable
								}
								required={schema.required}
							/>
						);
						break;
					case "text":
					case "number":
					case "url":
					default:
						input = (
							<Input
								rest={register(schema.accessor, schema.validations || {})}
								label={schema.label}
								error={errors[schema.accessor]?.message?.toString()}
								type={schema.type}
								className="w-full p-2"
								placeholder={schema.placeholder}
								disabled={
									(isUpdating && typeof schema.editable !== "undefined" && !schema.editable) ||
									!enable
								}
								required={schema.required}
								onInput={schema.onInput}
							/>
						);
						break;
				}
			} else if (schema.Input) {
				input = (
					<div className="kms_input-wrapper">
						<label className="kms_input-label">{schema.label}</label>
						<Controller
							control={control}
							name={schema.accessor}
							rules={schema.validations}
							render={({ field }) =>
								schema.Input!({
									field,
									error: errors[schema.accessor]?.message?.toString(),
									setError: (msg) =>
										setError.call(null, schema.accessor, { type: "custom", message: msg }),
								})
							}
						/>
					</div>
				);
			} else throw new Error(`Please provide Input or type prop to render input Labeled ${schema.label}`);

			return input;
		};

		const onFormSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			handleSubmit((data) => {
				let formattedData = schema.reduce(
					(values: Record<string, string | number | boolean>, schemaItem: SchemaType) => {
						// Do not add field if editing is disabled for it
						if (isUpdating && typeof schemaItem.editable !== "undefined" && !schemaItem.editable)
							return values;

						if (schemaItem.type === "number")
							values[schemaItem.accessor] = parseInt(data[schemaItem.accessor]);
						else values[schemaItem.accessor] = data[schemaItem.accessor];
						return values;
					},
					{},
				);
				onSubmit(formattedData);
			})();
		};

		return (
			<form onSubmit={onFormSubmit} ref={ref} className="khb-form-items">
				{schema.map((schema, i) => (
					<React.Fragment key={i}>{inputRenderer(schema)}</React.Fragment>
				))}
			</form>
		);
	},
);

export default Form;
