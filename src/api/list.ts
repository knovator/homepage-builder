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

	// Image Upload API
	IMAGE_UPLOAD: ({ prefix }: API_INPUT_TYPE) => ({
		url: `${prefix}/upload`,
		method: "post",
	}),
	IMAGE_REMOVE: ({ prefix, id }: API_INPUT_TYPE) => ({
		url: `${prefix}/${id}/delete`,
		method: "DELETE",
	}),
};

export default apiList;
