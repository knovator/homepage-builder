import React from "react";
import { DragDropContext, Droppable, DropResult, Draggable } from "react-beautiful-dnd";

interface DNDItemsListProps {
	onDragEnd: (result: DropResult) => void;
	items: OptionType[];
}

const DNDItemsList = ({ onDragEnd, items }: DNDItemsListProps) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(droppableProvided) => (
					<>
						<div
							className="space-y-2"
							ref={droppableProvided.innerRef}
							{...droppableProvided.droppableProps}
						>
							{items
								? items.map((item, index) => (
										<Draggable key={item.value} draggableId={item.value} index={index}>
											{(provided) => (
												<>
													<div
														className="khb_widget-new"
														key={item.value}
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<p className="text-base font-medium leading-6 text-black truncate">
															{item.label}
														</p>
													</div>
												</>
											)}
										</Draggable>
								  ))
								: null}
							{droppableProvided.placeholder}
						</div>
					</>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DNDItemsList;
