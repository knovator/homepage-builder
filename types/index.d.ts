declare module "@knovator/homepage-builder" {}

// Provider context
interface ProviderContextType {
	baseUrl: string;
	token: string | (() => Promise<string>);
	onError: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void;
	onSuccess: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void;
}
interface ProviderContextProviderProps
	extends React.PropsWithChildren,
		Omit<ProviderContextType, "onError" | "onSuccess"> {
	onError?: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void;
	onSuccess?: (
		callback_code: import("../src/constants/common").CALLBACK_CODES,
		code: string,
		message: string,
	) => void;
}
// \ End Provider context

// Widget context
interface WidgetContextType {}
// \ End Widget context

// Components
interface DrawerProps {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
}
type ButtonTypes = "primary" | "secondary" | "success" | "danger";
type ButtonSizes = "xs" | "sm" | "base" | "lg";
interface ButtonProps {
	children?: React.ReactNode;
	type?: ButtonTypes;
	size?: ButtonSizes;
	onClick?: () => void;
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
}
// \ End Components
