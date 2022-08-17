import React, { forwardRef, MutableRefObject, useEffect } from "react";
import { useForm } from "react-hook-form";

import { isEmpty } from "../../../helper/utils";
import Input from "../Input";

interface FormProps {
	schema: SchemaType[];
	data?: any;
	isUpdating?: boolean;
	onSubmit: (data: any) => void;
	enable?: boolean;
	ref: MutableRefObject<HTMLFormElement | null>;
}

const Form = forwardRef<HTMLFormElement | null, FormProps>(
	({ schema, onSubmit, data, isUpdating = false, enable = true }, ref) => {
		const {
			register,
			formState: { errors },
			handleSubmit,
			reset,
			setValue,
		} = useForm();

		// setting data values
		useEffect(() => {
			if (!isEmpty(data)) {
				schema.forEach((schemaItem) => {
					setValue(schemaItem.accessor, data[schemaItem.accessor]);
				});
			}
		}, [data, reset, schema, setValue]);

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
			if (schema.type) {
				switch (schema.type) {
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

						values[schemaItem.accessor] = data[schemaItem.accessor];
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
