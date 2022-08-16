import React, { createContext, useContext } from "react";
import { PAGE_LIMITS, TRANSLATION_PAIRS_COMMON } from "../constants/common";

interface WidgetContextProviderProps extends React.PropsWithChildren, Partial<WidgetContextType> {}

const WidgetContext = createContext<WidgetContextType | null>(null);

const WidgetContextProvider = ({
	t = (key: string) =>
		((
			{
				...TRANSLATION_PAIRS_COMMON,
			} as any
		)[key]),
	// Form
	list = [],
	formState = "",
	closeForm = () => {},
	loading = false,
	onChangeFormState = () => {},
	onWidgetFormSubmit = () => {},
	updateData = null,
	canAdd = false,
	canUpdate = false,
	// Pagination
	currentPage = 1,
	limits = PAGE_LIMITS,
	pageSize = PAGE_LIMITS[0],
	setCurrentPage = () => {},
	setPageSize = () => {},
	totalPages = 0,
	totalRecords = 0,
	canList = false,
	// Table
	columns = [],
	data = [],
	canDelete = false,
	loader = undefined,
	// other
	children,
}: WidgetContextProviderProps) => {
	return (
		<WidgetContext.Provider
			value={{
				t,
				// Form
				list,
				closeForm,
				formState,
				loading,
				onChangeFormState,
				onWidgetFormSubmit,
				updateData,
				canAdd,
				canUpdate,
				// Pagination
				currentPage,
				limits,
				pageSize,
				setCurrentPage,
				setPageSize,
				totalPages,
				totalRecords,
				canList,
				// Table
				columns,
				data,
				canDelete,
				loader,
			}}
		>
			{children}
		</WidgetContext.Provider>
	);
};

export function useWidgetState() {
	const context = useContext(WidgetContext);
	if (!context) throw new Error("Widget Context must be used within WidgetContext.Provider");

	return context;
}

export default WidgetContextProvider;
