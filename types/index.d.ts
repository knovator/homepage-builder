declare module "@knovator/api";
declare module "@knovator/homepage-builder" {
	const Provider: (props: ProviderContextProviderProps) => JSX.Element;
}

// Provider context
interface ProviderContextType {
	baseUrl: string;
	token: string | (() => Promise<string>);
	onError: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void;
	onSuccess: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void;
	widgetRoutesPrefix: string;
	tilesRoutesPrefix: string;
}
interface ProviderContextProviderProps
	extends React.PropsWithChildren,
		Omit<ProviderContextType, "onError" | "onSuccess" | "widgetRoutesPrefix" | "tilesRoutesPrefix"> {
	onError?: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void;
	onSuccess?: (
		callback_code: import("../src/constants/common").CALLBACK_CODES,
		code: string,
		message: string,
	) => void;
	widgetRoutesPrefix?: string;
	tilesRoutesPrefix?: string;
}
// \ End Provider context

// Widget context
interface WidgetContextType {
	t: (key: string) => string;
	// Form
	list: any[];
	formState: FormActionTypes | undefined;
	closeForm: () => void;
	onWidgetFormSubmit: (data: any) => void;
	onChangeFormState: (status: FormActionTypes, data?: any) => void;
	updateData: any;
	loading: boolean;
	canAdd: boolean;
	canUpdate: boolean;
	onDeleteTile: (id: string) => void;
	getWidgets: (searchText: string) => void;
	// Pagination
	currentPage: number;
	setCurrentPage: (page: number) => void;
	totalPages: number;
	pageSize: number;
	setPageSize: (size: number) => void;
	totalRecords: number;
	limits: number[];
	canList: boolean;
	// Table
	columns: ColumnsSchema;
	data: any;
	loader?: JSX.Element;
	canDelete?: boolean;
	// Tile
	tilesList: { [key: string]: any };
	tilesLoading: boolean;
	onTileFormSubmit: (state: FormActionTypes, data: any) => void;
}
// \ End Widget context

// Components
interface DrawerProps {
	children?: React.ReactNode;
	open: boolean;
	onClose?: () => void;
	id?: string;
	name?: string;
	title?: string;
}
type ButtonTypes = "primary" | "secondary" | "success" | "danger";
type ButtonSizes = "xs" | "sm" | "base" | "lg";
interface ButtonProps {
	children?: React.ReactNode;
	type?: ButtonTypes;
	size?: ButtonSizes;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
}
interface IconProps {
	srText?: string;
	className?: string;
}
type InputSizes = "xs" | "sm" | "base" | "lg";
interface InputProps {
	id?: string;
	label?: string;
	placeholder?: string;
	type?: string;
	size?: InputSizes;
	className?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	rest?: any;
	onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
interface SelectProps {
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	label?: string;
	error?: string;
	options?: { value: string; label: string }[];
	className?: string;
	disabled?: boolean;
	size?: InputSizes;
	id?: string;
	rest?: any;
	required?: boolean;
}
interface FormProps {
	open: boolean;
	onClose: () => void;
	formState: FormActionTypes | undefined;
}
interface InputRendererProps {
	field: import("react-hook-form").ControllerRenderProps;
	error?: string;
	setError: (msg: string) => void;
}
interface SchemaType {
	label?: string;
	accessor: string;
	Input?: (props: InputRendererProps) => JSX.Element;
	validations?: import("react-hook-form").RegisterOptions;
	editable?: boolean;
	onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: "text" | "number" | "select" | "checkbox" | "textarea" | "file" | "url";
	options?: { value: string; label: string }[];
	defaultValue?: string | number | boolean;
	placeholder?: string;
	required?: boolean;
}
interface WidgetProps {
	t?: any;
}
interface PaginationProps {
	totalPages: number;
	totalRecords: number;
	currentPage: number;
	pageSize: number;
	setCurrentPage: (value: number) => void;
}
interface TileItemsAccordianProps {
	id: string;
	show: boolean;
	title: string;
	tilesData: any[];
	widgetId: string;
	collapseId: string;
	schema: SchemaType[];
	tileType: "Web" | "Mobile";
	toggleShow: (status: boolean) => void;
	onDataSubmit: (state: FormActionTypes, data: any, updateId?: string) => void;
	onDelete: (id: string) => void;
	editText?: string;
	cancelText?: string;
	deleteText?: string;
	saveText?: string;
}
// Table
type TableDataItemFormat = {
	label: string;
	dataKey: string;
	highlight?: boolean;
};
interface TableProps {
	data: any[];
	dataKeys: TableDataItemFormat[];
	actions?: {
		edit?: (data: { [key: string]: any }) => void;
		delete?: (data: { [key: string]: any }) => void;
	};
}
// \ End Table
// \ End Components

// API
type ACTION_TYPES = "IMAGE_UPLOAD" | "IMAGE_REMOVE" | "CREATE" | "LIST" | "DELETE" | "UPDATE" | "TILES";

interface BaseAPIProps {
	config?: any;
	baseUrl: string;
	token: string | (() => Promise<string>);
	data?: any;
	url: string;
	method: string;
	onError?: (error: Error) => void;
}

type API_TYPE = {
	url: string;
	method: string;
};

type API_INPUT_TYPE = { prefix: string; id?: string };

type Routes_Input = {
	[K in ACTION_TYPES]?: (data: API_INPUT_TYPE) => API_TYPE;
};
// \ End API

// Hooks
type FormActionTypes = "ADD" | "UPDATE" | "DELETE" | null | "";
// \ End Hooks

type TFunc = (key: string) => string;
