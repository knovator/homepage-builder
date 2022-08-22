import { useCallback, useEffect, useRef, useState } from "react";
import { CALLBACK_CODES, INTERNAL_ERROR_CODE } from "../constants/common";
import { useProviderState } from "../context/ProviderContext";
import { paginationDataGatter, dataGatter, build_path } from "../helper/utils";
import usePagination from "./usePagination";
import request, { getApiType } from "../api";

interface UseWidgetProps {
	defaultLimit: number;
	routes?: Routes_Input;
	preConfirmDelete?: (data: { row: any }) => Promise<boolean>;
}

const useWidget = ({ defaultLimit, routes, preConfirmDelete }: UseWidgetProps) => {
	const [list, setList] = useState<any[]>([]);
	const [tilesList, setTilesList] = useState({ web: [], mobile: [] });
	const [tilesLoading, setTilesLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [itemData, setItemData] = useState<any | null>(null);
	const [formState, setFormState] = useState<FormActionTypes>();

	const { baseUrl, token, onError, onSuccess, widgetRoutesPrefix, tilesRoutesPrefix } = useProviderState();
	const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit });

	const handleError = (code: CALLBACK_CODES) => (error: any) => {
		const { data = {} } = error?.response || {};
		if (data?.code === "UNAUTHENTICATED") {
			// onLogout();
		}
		onError(code, "error", data?.message);
	};
	const getWidgets = useCallback(
		async (search?: string) => {
			try {
				setLoading(true);
				let api = getApiType({ routes, action: "LIST", prefix: widgetRoutesPrefix });
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
	const getTiles = useCallback(
		async (id: string) => {
			try {
				setTilesLoading(true);
				let api = getApiType({ routes, action: "TILES", prefix: tilesRoutesPrefix, id });
				let response = await request({
					baseUrl,
					token,
					method: api.method,
					url: api.url,
					onError: handleError(CALLBACK_CODES.GET_ALL),
				});
				if (response?.code === "SUCCESS") {
					setTilesLoading(false);
					return setTilesList(dataGatter(response));
				}
				setTilesLoading(false);
			} catch (error) {
				setTilesLoading(false);
			}
		},
		[baseUrl, routes, token],
	);
	const onWidgetFormSubmit = async (data: any) => {
		setLoading(true);
		let code = formState === "ADD" ? CALLBACK_CODES.CREATE : CALLBACK_CODES.UPDATE;
		try {
			let api = getApiType({
				routes,
				action: formState === "ADD" ? "CREATE" : "UPDATE",
				prefix: widgetRoutesPrefix,
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
				getWidgets();
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
	const onCofirmDeleteWidget = async () => {
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
					prefix: widgetRoutesPrefix,
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
					getWidgets();
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
	const onDeleteTile = async (id: string) => {
		try {
			setTilesLoading(true);
			let api = getApiType({ routes, action: "DELETE", prefix: tilesRoutesPrefix, id });
			let response = await request({
				baseUrl,
				token,
				method: api.method,
				url: api.url,
				onError: handleError(CALLBACK_CODES.DELETE),
			});
			if (response?.code === "SUCCESS") {
				setTilesLoading(false);
				onSuccess(CALLBACK_CODES.DELETE, response?.code, response?.message);
				getTiles(itemData?._id);
				return;
			}
			setTilesLoading(false);
			onError(CALLBACK_CODES.DELETE, response?.code, response?.message);
		} catch (error) {
			setTilesLoading(false);
			onError(CALLBACK_CODES.DELETE, INTERNAL_ERROR_CODE, (error as Error).message);
		}
	};
	const onImageUpload = async (file: File): Promise<{ fileUrl: string; fileId: string; fileUri: string } | void> => {
		try {
			const payload = new FormData();
			payload?.append("folder", "images");
			payload?.append("file", file, file.name);
			let api = getApiType({ routes, action: "IMAGE_UPLOAD", prefix: "media" });
			let response = await request({
				data: payload,
				baseUrl,
				token,
				method: api.method,
				url: api.url,
				config: {
					contentType: "multipart/form-data",
				},
				onError: handleError(CALLBACK_CODES.IMAGE_UPLOAD),
			});
			if (response.code === "SUCCESS") {
				let responseData = response?.data[0] || response?.data;
				return {
					fileId: responseData?._id || responseData?.id,
					fileUrl: build_path(baseUrl, responseData?.uri),
					fileUri: responseData?.uri,
				};
			} else onError(CALLBACK_CODES.IMAGE_REMOVE, response.code, response.message);
		} catch (error) {
			onError(CALLBACK_CODES.IMAGE_REMOVE, INTERNAL_ERROR_CODE, (error as Error).message);
		}
	};
	const onImageRemove = async (id: string): Promise<void> => {
		try {
			let api = getApiType({ routes, action: "IMAGE_REMOVE", prefix: "media", id });
			let response = await request({
				baseUrl,
				token,
				method: api.method,
				url: api.url,
				onError: handleError(CALLBACK_CODES.IMAGE_REMOVE),
			});
			if (response?.code === "SUCCESS") {
				onSuccess(CALLBACK_CODES.IMAGE_REMOVE, response.code, response.message);
			} else {
				onError(CALLBACK_CODES.IMAGE_REMOVE, response.code, response.message);
			}
		} catch (error) {
			onError(CALLBACK_CODES.IMAGE_REMOVE, INTERNAL_ERROR_CODE, (error as Error).message);
		}
	};
	const onChangeFormState = (state: FormActionTypes, data?: any) => {
		setItemData(data || null);
		setFormState(state);
		if (state === "UPDATE" && data) {
			getTiles(data._id);
		} else if (state === "ADD") {
			setTilesList({ web: [], mobile: [] });
		}
	};
	const onTileFormSubmit = async (state: FormActionTypes, data: any, updateId?: string) => {
		setTilesLoading(true);
		let code = state === "ADD" ? CALLBACK_CODES.CREATE : CALLBACK_CODES.UPDATE;
		try {
			let api = getApiType({
				routes,
				action: state === "ADD" ? "CREATE" : "UPDATE",
				prefix: tilesRoutesPrefix,
				id: updateId,
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
				setTilesLoading(false);
				onSuccess(code, response?.code, response?.message);
				getTiles(itemData._id);
			} else {
				setTilesLoading(false);
				onError(code, response?.code, response?.message);
			}
		} catch (error) {
			setTilesLoading(false);
			onError(code, INTERNAL_ERROR_CODE, (error as Error).message);
		}
	};

	useEffect(() => {
		getWidgets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageSize, currentPage]);

	return {
		list,
		getWidgets,
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
		formState,
		itemData,
		onChangeFormState,
		onCloseForm,
		onDeleteTile,
		onWidgetFormSubmit,
		onCofirmDeleteWidget,
		onImageUpload,
		onImageRemove,

		// Tiles
		tilesList,
		tilesLoading,
		onTileFormSubmit,
	};
};

export default useWidget;
