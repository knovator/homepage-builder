import React, { useRef, useState } from "react";
import Accordian from "../../common/Accordian";
import Button from "../../common/Button";
import Form from "../../common/Form";

interface TileItemsAccordianProps {
	show: boolean;
	id: string;
	collapseId: string;
	title: string;
	toggleShow: (status: boolean) => void;
	schema: SchemaType[];
	onDataSubmit: (index: number, data: any) => void;
}

const TileItemsAccordian = ({
	schema,
	onDataSubmit,
	show,
	title,
	id,
	collapseId,
	toggleShow,
}: TileItemsAccordianProps) => {
	const formRefs = useRef<(HTMLFormElement | null)[]>([]);
	const [itemsShow, setItemsShow] = useState<boolean[]>([]);

	const onWebTileFormSubmitClick = (index: number) => {
		formRefs.current[index]?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
	};
	const onWebTileFormSubmit = (index: number, data: any) => {
		onDataSubmit(index, data);
	};
	const onItemsToggleClick = (index: number) => {
		let newItemsShow: boolean[] = [...itemsShow];
		let newStatus = !newItemsShow[index];
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
	};

	return (
		<Accordian
			open={show}
			onToggle={() => toggleShow(!show)}
			title={title}
			collapseId={collapseId}
			id={id}
			footerContent={
				<Button size="sm" onClick={onTileAddClick}>
					Add
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
								<Button type="secondary" size="sm">
									Cancel
								</Button>
								<Button type="primary" size="sm" onClick={() => onWebTileFormSubmitClick(index)}>
									Submit
								</Button>
								<Button type="danger" size="sm" onClick={() => onTileRemoveClick(index)}>
									Delete
								</Button>
							</>
						}
					>
						<Form
							schema={schema}
							onSubmit={(data) => onWebTileFormSubmit(index, data)}
							ref={(el) => (formRefs.current[index] = el)}
						/>
					</Accordian>
				))}
			</div>
		</Accordian>
	);
};

export default TileItemsAccordian;
