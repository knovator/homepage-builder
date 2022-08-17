const DEFAULT_OFFSET_PAYLOAD = 0;
const DECIMAL_REDIX = 10;
const DEFAULT_CURRENT_PAGE = 1;
const INTERNAL_ERROR_CODE = "INTERNAL_ERROR";
const DEFAULT_LIMIT = 10;
const PAGE_LIMITS = [10, 20, 30];

enum CALLBACK_CODES {
	"GET_ALL" = "GET_ALL",
	"GET_SINGLE" = "GET_SINGLE",
	"CREATE" = "CREATE",
	"UPDATE" = "UPDATE",
	"DELETE" = "DELETE",
	"IMAGE_UPLOAD" = "IMAGE_UPLOAD",
	"IMAGE_REMOVE" = "IMAGE_REMOVE",
	"INTERNAL" = "INTERNAL",
}

const DEFAULT_PERMISSIONS = {
	list: true,
	add: true,
	destroy: true,
	partialUpdate: true,
	sequencing: false,
	update: true,
};

const TRANSLATION_PAIRS_COMMON = {
	permanentlyDelete: "You are about to permanently delete the",
	lossOfData:
		"This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention.",
	pleaseType: "Please type",
	toProceedOrCancel: "to processed or close this modal to cancel.",
	confirm: "Confirm",
	"common:actions": "Actions",
	"common:cancel": "Cancel",
	page: "Page",
	next: "Next",
	previous: "Previous",
	indicatesRequired: "Indicates fields are required",
};

const TRANSLATION_PAIRS_WIDGET = {
	"widget.name": "Name",
	"widget.namePlaceholder": "Enter name",
	"widget.nameRequired": "Name is required",
	"widget.type": "Type",
	"widget.typeRequired": "Type is required",
	"widget.code": "Code",
	"widget.codePlaceholder": "Enter code",
	"widget.codeRequired": "Code is required",
	"widget.webPerRow": "Web Per Row",
	"widget.webPerRowPlaceholder": "Enter web per row",
	"widget.mobilePerRow": "Mobile Per Row",
	"widget.mobilePerRowPlaceholder": "Enter mobile per row",
	"widget.webItems": "Web Items",
	"widget.mobileItems": "Mobile Items",
};
const TRANSLATION_PAIRS_TILES = {
	"tile.title": "Title",
	"tile.titlePlaceholder": "Enter title",
	"tile.altText": "Alt Text",
	"tile.altTextPlaceholder": "Enter alt text",
	"tile.link": "Link",
	"tile.linkPlaceholder": "Enter link",
	"tile.image": "Image",
};

export {
	CALLBACK_CODES,
	DECIMAL_REDIX,
	DEFAULT_CURRENT_PAGE,
	DEFAULT_OFFSET_PAYLOAD,
	INTERNAL_ERROR_CODE,
	DEFAULT_PERMISSIONS,
	TRANSLATION_PAIRS_COMMON,
	DEFAULT_LIMIT,
	PAGE_LIMITS,
	TRANSLATION_PAIRS_WIDGET,
	TRANSLATION_PAIRS_TILES,
};
