import React, { createContext, useContext } from "react";
import { PAGE_LIMITS, TRANSLATION_PAIRS_COMMON } from "../constants/common";

interface PageContextProviderProps extends React.PropsWithChildren, Partial<PageContextType> {}

const PageContext = createContext<PageContextType | null>(null);

const PageContextProvider = ({
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
	onPageFormSubmit = () => {},
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
}: PageContextProviderProps) => {
	return (
		<PageContext.Provider
			value={{
				t,
				// Form
				list,
				closeForm,
				formState,
				loading,
				onChangeFormState,
				canAdd,
				canUpdate,
				onPageFormSubmit,
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
		</PageContext.Provider>
	);
};

export function usePageState() {
	const context = useContext(PageContext);
	if (!context) throw new Error("Page Context must be used within PageContext.Provider");

	return context;
}

export default PageContextProvider;
