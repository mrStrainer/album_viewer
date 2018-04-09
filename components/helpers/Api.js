export const json = (response) => response.json()

export const status = (response) => {
	if (response.error) {
		const { status, message } = response.error;
		throw `${status}: ${message}`;
	}
	return response;
}

export function createOptions({ method = 'GET',token } = {}) {
	return {
		method: `${method}`,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	};
}

export const fetchAlbum = (id = '67smHJOf5YlFwad6dAlppm', options) => {
	return fetch(`https://api.spotify.com/v1/albums/${id}`, options)
		.then(json)
		.then(status)
		.then(res => {
			return res;
		});
}

export const search = (q, options) => {
	return fetch(`https://api.spotify.com/v1/search?q=${q}&type=album&limit=15`, options)
		.then(json)
		.then(status)
		.then(res => {
			return res;
		})
}