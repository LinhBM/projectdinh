import { TOKEN } from "@utility/constant";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const request = axios.create({
    headers: {
        "accept-language": "vi",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get(TOKEN)}`
    },
    method: 'get',
});

const api = (options: AxiosRequestConfig) => {
    return request(options);
};

export default api;
