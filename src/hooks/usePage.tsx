import { useCallback, useEffect, useState } from "react";
import { CALLBACK_CODES, INTERNAL_ERROR_CODE } from "../constants/common";
import { useProviderState } from "../context/ProviderContext";
import { paginationDataGatter, dataGatter, build_path } from "../helper/utils";
import usePagination from "./usePagination";
import request, { getApiType } from "../api";

interface UsePageProps {
	defaultLimit: number;
	routes?: Routes_Input;
	preConfirmDelete?: (data: { row: any }) => Promise<boolean>;
}

const usePage = ({ defaultLimit, routes, preConfirmDelete }: UsePageProps) => {
	const [list, setList] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [widgets, setWidgets] = useState<{ added: any[]; notAdded: any[] }>({ added: [], notAdded: [] });
	const [totalPages, setTotalPages] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [itemData, setItemData] = useState<any | null>(null);
	const [formState, setFormState] = useState<FormActionTypes>();

	const { baseUrl, token, onError, onSuccess, pageRoutesPrefix, tilesRoutesPrefix } = useProviderState();
	const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit });

	const handleError = (code: CALLBACK_CODES) => (error: any) => {
		const { data = {} } = error?.response || {};
		if (data?.code === "UNAUTHENTICATED") {
			// onLogout();
		}
		onError(code, "error", data?.message);
	};
	const getPages = useCallback(
		async (search?: string) => {
			try {
				setLoading(true);
				let api = getApiType({ routes, action: "LIST", prefix: pageRoutesPrefix });
				let response = await request({
					baseUrl,
					token,
					method: api.method,
					url: api.url,
					onError: handleError(CALLBACK_CODES.GET_ALL),
					data: {
						search,
						options: {
							offset: filter.offset,
							limit: filter.limit,
							page: currentPage,
							pagination: true,
						},
					},
				});
				if (response?.code === "SUCCESS") {
					setLoading(false);
					setTotalPages(response.data.totalPages);
					setTotalRecords(response.data.totalDocs);
					return setList(paginationDataGatter(response));
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		},
		[baseUrl, currentPage, filter.limit, filter.offset, routes, token],
	);
	const onPageFormSubmit = async (data: any) => {
		setLoading(true);
		let code = formState === "ADD" ? CALLBACK_CODES.CREATE : CALLBACK_CODES.UPDATE;
		try {
			let api = getApiType({
				routes,
				action: formState === "ADD" ? "CREATE" : "UPDATE",
				prefix: pageRoutesPrefix,
				id: itemData?._id,
			});
			let response = await request({
				baseUrl,
				token,
				data,
				url: api.url,
				method: api.method,
				onError: handleError(code),
			});
			if (response?.code === "SUCCESS") {
				setLoading(false);
				onSuccess(code, response?.code, response?.message);
				getPages();
				onCloseForm();
			} else {
				setLoading(false);
				onError(code, response?.code, response?.message);
			}
		} catch (error) {
			setLoading(false);
			onError(code, INTERNAL_ERROR_CODE, (error as Error).message);
		}
	};
	const onCloseForm = () => {
		setFormState(undefined);
		setItemData(null);
	};
	const onCofirmDeletePage = async () => {
		try {
			let proceed = true;
			if (typeof preConfirmDelete === "function") {
				try {
					proceed = await preConfirmDelete({ row: itemData });
				} catch (error) {
					proceed = false;
				}
			}

			if (proceed) {
				setLoading(true);
				let api = getApiType({
					routes,
					action: "DELETE",
					prefix: pageRoutesPrefix,
					id: itemData?._id,
				});
				let response = await request({
					baseUrl,
					token,
					method: api.method,
					url: api.url,
					onError: handleError(CALLBACK_CODES.DELETE),
				});
				if (response?.code === "SUCCESS") {
					setLoading(false);
					onSuccess(CALLBACK_CODES.DELETE, response?.code, response?.message);
					getPages();
					onCloseForm();
					return;
				}
				setLoading(false);
				onError(CALLBACK_CODES.DELETE, response?.code, response?.message);
				onCloseForm();
			}
		} catch (error) {
			setLoading(false);
			onError(CALLBACK_CODES.DELETE, INTERNAL_ERROR_CODE, (error as Error).message);
			onCloseForm();
		}
	};
	const onChangeFormState = (state: FormActionTypes, data?: any) => {
		setItemData(data || null);
		setFormState(state);
	};

	useEffect(() => {
		getPages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageSize, currentPage]);

	return {
		list,
		getPages,
		loading,
		setLoading,

		// Pagination
		pageSize,
		totalPages,
		currentPage,
		totalRecords,
		setCurrentPage,
		setPageSize,

		// Form
		itemData,
		formState,
		onChangeFormState,
		onCloseForm,
		onPageFormSubmit,
		onCofirmDeletePage,
	};
};

export default usePage;
