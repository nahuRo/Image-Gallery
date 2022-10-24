import axios from "axios";

const API_KEY = "563492ad6f9170000100000120ab84fa156f44788616a968519677ba";

export const getImages = async (url = "cars") => {
	const data = await axios.get(`https://api.pexels.com/v1/search?query=${url}`, {
		headers: {
			Authorization: API_KEY,
		},
	});
	return data;
};
