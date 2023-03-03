import axios from "axios";

const instance = axios.create({
    baseURL: "http://13.233.255.36/"
})

export default instance