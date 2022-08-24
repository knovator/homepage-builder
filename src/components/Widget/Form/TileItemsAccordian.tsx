import React, { useEffect, useRef, useState } from "react";
import Accordian from "../../common/Accordian";
import Button from "../../common/Button";
import Form from "../../common/Form";

const TileItemsAccordian = ({
	schema,
	onDataSubmit,
	show,
	title,
	id,
	tilesData,
	collapseId,
	toggleShow,
	tileType,
	widgetId,
	onDelete,
	addText = "Add",
	saveText = "Save",
	cancelText = "Cancel",
	deleteText = "Delete",
	editText = "Edit",
}: TileItemsAccordianProps) => {
	const [data, setData] = useState<any[]>([]);
	const formRefs = useRef<(HTMLFormElement | null)[]>([]);
	const [itemsShow, setItemsShow] = useState<boolean[]>([]);
	const [editingItemIndex, setEditingItemIndex] = useState<Number>();

	useEffect(() => {
		if (Array.isArray(tilesData)) {
			setData(tilesData);
			formRefs.current = tilesData.map(() => null);
			setItemsShow(tilesData.map(() => false));
		}
	}, [tilesData]);

	const onTileFormSubmitClick = (index: number) => {
		formRefs.current[index]?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
	};
	const onTileFormSubmit = (index: number, formData: any) => {
		let state: FormActionTypes = index === editingItemIndex && data[index] ? "UPDATE" : "ADD";
		let finalData = { ...formData, widgetId, tileType, sequence: index };
		onDataSubmit(state, finalData, state === "UPDATE" ? data[index]?._id : undefined);
		setEditingItemIndex(undefined);
	};
	const onItemsToggleClick = (index: number, status?: boolean) => {
		let newItemsShow: boolean[] = [...itemsShow];
		let newStatus = typeof status === "undefined" ? !newItemsShow[index] : status;
		newItemsShow.fill(false);
		newItemsShow[index] = newStatus;
		setItemsShow(newItemsShow);
	};
	const onTileRemoveClick = (index: number) => {
		let newItemsShow: boolean[] = [...itemsShow];
		newItemsShow.splice(index, 1);
		setItemsShow(newItemsShow);
		formRefs.current.splice(index, 1);
	};
	const onTileAddClick = () => {
		let newItemsShow: boolean[] = [...itemsShow];
		newItemsShow.push(false);
		setItemsShow(newItemsShow);
		formRefs.current.push(null);
		onItemsToggleClick(newItemsShow.length - 1);
	};
	const onTileEditClick = (index: Number) => {
		setEditingItemIndex(index);
	};
	const onTileCancelClick = (index: number) => {
		if (!data[index]) {
			onTileRemoveClick(index);
		} else {
			setEditingItemIndex(undefined);
		}
		onItemsToggleClick(index, false);
	};
	const onDeleteClick = (index: number) => {
		onDelete(data[index]?._id);
		onTileRemoveClick(index);
	};

	return (
		<Accordian
			open={show}
			onToggle={() => toggleShow(!show)}
			title={title}
			collapseId={collapseId}
			id={id}
			footerContent={
				<Button size="sm" onClick={onTileAddClick} disabled={!widgetId}>
					{addText}
				</Button>
			}
		>
			<div className="khb_tile-items">
				{itemsShow.map((status, index) => (
					<Accordian
						key={index}
						open={status}
						onToggle={() => onItemsToggleClick(index)}
						title={`Item ${index + 1}`}
						collapseId={`${id}-item-content-${index}`}
						id={`${id}-item-${index}`}
						footerContent={
							<>
								{editingItemIndex === index || !data[index] ? (
									<>
										<Button size="sm" onClick={() => onTileFormSubmitClick(index)}>
											{saveText}
										</Button>
										<Button type="secondary" size="sm" onClick={() => onTileCancelClick(index)}>
											{cancelText}
										</Button>
									</>
								) : (
									<>
										<Button size="sm" onClick={() => onTileEditClick(index)}>
											{editText}
										</Button>
										<Button type="danger" size="sm" onClick={() => onDeleteClick(index)}>
											{deleteText}
										</Button>
									</>
								)}
							</>
						}
					>
						<Form
							schema={schema}
							data={data[index]}
							onSubmit={(data) => onTileFormSubmit(index, data)}
							ref={(el) => (formRefs.current[index] = el)}
							enable={editingItemIndex === index || !data[index]}
						/>
					</Accordian>
				))}
			</div>
		</Accordian>
	);
};

export default TileItemsAccordian;
