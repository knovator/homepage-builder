import React, { createContext, useContext } from "react";

const ProviderContext = createContext<ProviderContextType | null>(null);

const Provider = ({
	children,
	baseUrl,
	token,
	onError = () => {},
	onSuccess = () => {},
	tilesRoutesPrefix = "tiles",
	widgetRoutesPrefix = "widgets",
}: ProviderContextProviderProps) => {
	return (
		<ProviderContext.Provider
			value={{
				baseUrl,
				token,
				onError,
				onSuccess,
				tilesRoutesPrefix,
				widgetRoutesPrefix,
			}}
		>
			{children}
		</ProviderContext.Provider>
	);
};

export function useProviderState() {
	const context = useContext(ProviderContext);
	if (!context) throw new Error("Provider Context must be used within ProviderContext.Provider");

	return context;
}

export default Provider;
