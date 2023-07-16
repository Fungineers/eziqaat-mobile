import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.0.105:3001",
});

apiInstance.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, console.log);

export const login = async ({ credential, password }) => {
  return await apiInstance.post("/auth/login", {
    credential,
    password,
    platform: "MOBILE",
  });
};

export const me = async () => {
  return await apiInstance.get("/auth/me");
};

export const signup = async ({ firstName, lastName, email, phone, cnic }) => {
  const role = "DONOR";
  return await apiInstance.post("/user", {
    firstName,
    lastName,
    email,
    role,
    phone,
    cnic,
  });
};

export const changePhone = async ({ phone }) => {
  return await apiInstance.put("/user/phone", { phone });
};

export const changeEmail = async ({ email }) => {
  return await apiInstance.put("/user/email", { email });
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  return await apiInstance.put("/user/password", {
    currentPassword,
    newPassword,
  });
};

export const resetPassword = async ({ credential }) => {
  return await apiInstance.put("/user/password/reset", {
    credential,
  });
};

export const createWorker = async ({
  firstName,
  lastName,
  email,
  phone,
  cnic,
}) => {
  return await apiInstance.post("/worker", {
    firstName,
    lastName,
    email,
    phone,
    cnic,
  });
};

export const getWorkers = async (s = "") => {
  return await apiInstance.get(`/worker`, { params: { s } });
};

export const getWorkerById = async (id) => {
  return await apiInstance.get(`/worker/${id}`);
};

export const getChairpersonDashboard = async () => {
  return await apiInstance.get("/dashboard");
};

export const getAreas = async () => {
  return await apiInstance.get("/area");
};

export const donorDonationRequest = async ({ areaId, amount, address }) => {
  return await apiInstance.post("/donation/request", {
    areaId,
    amount,
    address,
  });
};

export const getDonorRequests = async () => {
  return await apiInstance.get("/donation/donor-requests");
};

export const getDonorStats = async () => {
  return await apiInstance.get("/donor/stats");
};

export const getAreaStats = async () => {
  return await apiInstance.get("/area/stats");
};

export const getAreaDailyStats = async () => {
  return await apiInstance.get("/area/daily-stats");
};

export const getAreaRequestedDonations = async (s = "") => {
  return await apiInstance.get("/area/requested-donations", { params: { s } });
};

export const getAreaRequestStats = async () => {
  return await apiInstance.get("/area/request-stats");
};

export const getDonationInfo = async ({ donationId }) => {
  return await apiInstance.get(`/donation/${donationId}`);
};

export const approvePendingDonation = async ({ donationId }) => {
  return await apiInstance.patch(`/donation/approve/${donationId}`);
};
