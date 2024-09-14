import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../shared/lib/config";

const fetcher = () => {
  return axios.create({
    withCredentials: true,
  });
};

const successSwal = () =>
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Успешно!",
    showConfirmButton: false,
    timer: 1500,
  });

const errorSwal = (msg) =>
  Swal.fire({
    icon: "error",
    title: "Произошла ошибка",
    text: msg || "Ошибка сервера",
  });

export const loginRequest = async (data) => {
  const axios = fetcher();
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);

    if (response.status === 200) {
      successSwal();
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      errorSwal(error.response.data.message);
    } else {
      errorSwal();
    }
    return false;
  }
};

export const registerRequest = async (data) => {
  const axios = fetcher();
  try {
    const response = await axios.post(`${BASE_URL}/auth/registration`, data);

    if (response.status === 200) {
      successSwal();
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      errorSwal(error.response.data.message);
    } else {
      errorSwal();
    }
    return false;
  }
};

export const logoutRequest = async () => {
  const axios = fetcher();
  try {
    const response = await axios.get(`${BASE_URL}/auth/logout`);

    if (response.status === 200) {
      successSwal();
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      errorSwal(error.response.data.message);
    } else {
      errorSwal();
    }
    return false;
  }
};