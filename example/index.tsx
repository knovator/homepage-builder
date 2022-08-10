import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import { Widget } from "../.";

const App = () => {
	return (
		<div>
			<Widget />
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
