import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.0.106:3001",
});

apiInstance.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, console.log);

export const signin = async ({ credential, password }) => {
  return await apiInstance.post("/auth/signin", { credential, password });
};

export const me = async () => {
  return await apiInstance.get("/auth/me");
};
