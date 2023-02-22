import axios from "../axios";

export const fetchMsg = (vendorId, userId, token) => axios.get(`/getMessage/${userId}/${vendorId}`, { headers: { Authorization: `Bearer ${token}` }})

export const sndMsg = (data, token) => axios.post('/chat', data, { headers: { Authorization: `Bearer ${token}` } })

export const userConnections = (userId, token) => axios.get(`/getUserConnections/${userId}`, { headers: { Authorization: `Bearer ${token}` } })

export const viewGig = (gigId, token) => axios.get(`/singleGig/${gigId}`, { headers: { Authorization: `Bearer ${token}` } })

export const userDetail = (token) => axios.get("/userProfile", { headers: { Authorization: `Bearer ${token}` }})

export const allProduct = () => axios.get("/products")

export const allService = () => axios.get("/services")