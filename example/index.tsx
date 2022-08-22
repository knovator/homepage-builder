import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import { Widget, Provider, Page } from "../.";

const App = () => {
	return (
		<Provider baseUrl="http://localhost:8080">
			{/* <Widget /> */}
			<Page />
		</Provider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
