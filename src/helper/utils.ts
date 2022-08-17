export const paginationDataGatter = (data: any) => {
	return data.data.docs;
};
export const dataGatter = (data: any) => {
	return data.data;
};

export const capitalizeFirstLetter = (string = "") => `${string?.charAt(0)?.toUpperCase()}${string?.slice(1)}`;

export const changeToCode = (string = "") =>
	string
		.replace(/[^\s\w]/gi, "")
		?.toUpperCase()
		?.replace(/ /g, "_");

export const isObject = (data: any) => data?.constructor?.name === "Object";
export const isString = (data: any) => data?.constructor?.name === "String";
export const isArray = (data: any) => data?.constructor?.name === "Array";

export const isEmpty = (data: any) => {
	if (isObject(data)) return Object.keys(data).length === 0;
	if (isArray(data)) return data.length === 0;
	if (isString(data)) return !data || data.length === 0;
	if ([undefined, null, ""].includes(data)) return true;
	return false;
};

export function createTranslation(t: TFunc | undefined, obj: Record<string, string>) {
	return function (key: string): string {
		if (typeof t === "function") return t(key);
		return obj[key] || "";
	};
}
