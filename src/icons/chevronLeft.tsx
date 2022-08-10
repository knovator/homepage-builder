import React from "react";
const ChevronLeft = ({ srText }: IconProps) => {
	return (
		<>
			{srText ? <span className="khb_sr-only">{srText}</span> : null}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -5 24 24" width="24" fill="currentColor">
				<path d="M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z"></path>
			</svg>
		</>
	);
};

export default ChevronLeft;
