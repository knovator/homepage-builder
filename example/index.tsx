import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import { Widget, Provider, Page } from "../.";

const App = () => {
	const [selectedType, setSelectedType] = React.useState("widget");
	return (
		<>
			<div className="form-group">
				<label htmlFor="widget">
					<input
						type="radio"
						value="widget"
						id="widget"
						checked={selectedType === "widget"}
						onChange={(e) => setSelectedType(e.target.value)}
					/>
					Widget
				</label>
				<label htmlFor="page">
					<input
						type="radio"
						value="page"
						id="page"
						checked={selectedType === "page"}
						onChange={(e) => setSelectedType(e.target.value)}
					/>
					Page
				</label>
			</div>
			<Provider baseUrl="http://localhost:8080">
				{selectedType === "widget" && <Widget />}
				{selectedType === "page" && <Page />}
			</Provider>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
