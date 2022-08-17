const apiList = {
	LIST: ({ prefix }: API_INPUT_TYPE) => ({
		url: `${prefix}/list`,
		method: "POST",
	}),
	CREATE: ({ prefix }: API_INPUT_TYPE) => ({
		url: `${prefix}`,
		method: "POST",
	}),
	UPDATE: ({ prefix, id }: API_INPUT_TYPE) => ({
		url: `${prefix}/${id}`,
		method: "PUT",
	}),
	DELETE: ({ prefix, id }: API_INPUT_TYPE) => ({
		url: `${prefix}/${id}`,
		method: "DELETE",
	}),

	TILES: ({ prefix, id }: API_INPUT_TYPE) => ({
		url: `${prefix}/${id}`,
		method: "GET",
	}),
	// TILE_CREATE: ({ prefix }: API_INPUT_TYPE) => ({
	// 	url: `${prefix}`,
	// 	method: "POST",
	// }),
	// TILE_UPDATE: ({ prefix, id }: API_INPUT_TYPE) => ({
	// 	url: `${prefix}/${id}`,
	// 	method: "PUT",
	// }),
	// TILE_DELETE: ({ prefix, id }: API_INPUT_TYPE) => ({
	// 	url: `${prefix}/${id}`,
	// 	method: "DELETE",
	// }),

	// Image Upload API
	IMAGE_UPLOAD: () => ({
		url: "files/upload",
		method: "post",
	}),
	IMAGE_REMOVE: ({ id }: API_INPUT_TYPE) => ({
		url: `files/${id}/delete`,
		method: "DELETE",
	}),
};

export default apiList;
