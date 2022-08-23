import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface SelectedWidgetsProps {
	widgets: { label: string; value: string }[];
	placeholder?: any;
}
const SelectedWidgets = ({ widgets, placeholder }: SelectedWidgetsProps) => {
	return (
		<>
			{widgets
				? widgets.map((widget, index) => (
						<Draggable key={widget.value} draggableId={widget.value} index={index}>
							{(provided) => (
								<>
									<div
										className="khb_widget-new"
										key={widget.value}
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<p className="text-base font-medium leading-6 text-black truncate">
											{widget.label}
										</p>
									</div>
								</>
							)}
						</Draggable>
				  ))
				: null}
			{placeholder}
		</>
	);
};

export default SelectedWidgets;
