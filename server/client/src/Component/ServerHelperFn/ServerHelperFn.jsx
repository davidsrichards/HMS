const BASE_URL = "/api";
import axios from "axios";
import { useEffect, useState } from "react";

// admin login

export async function adminLogin(credentials) {
  try {
    const { data, status } = await axios.post(
      `${BASE_URL}/admin/login`,
      credentials
    );

    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject(error.response.status);
  }
}

// register doctor

export async function register(url, credentials) {
  try {
    const { data, status } = await axios.post(`${BASE_URL}${url}`, credentials);
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject(error);
  }
}

// get all doctors

export function GetAll(url, condition) {
  const [userinfo, setUserInfo] = useState({
    userData: [],
    serverError: null,
    isLoadng: false,
  });
  useEffect(() => {
    setUserInfo((p) => ({ ...p, isLoadng: true }));
    (async () => {
      try {
        const { data, status } = await axios.get(`${BASE_URL}${url}`);
        if (data) {
          setUserInfo((p) => ({ ...p, userData: data }));
          setUserInfo((p) => ({ ...p, serverError: null }));
          setUserInfo((p) => ({ ...p, isLoadng: false }));
        }
      } catch (error) {
        console.log(error);
        setUserInfo((p) => ({ ...p, isLoadng: false }));
        setUserInfo((p) => ({ ...p, serverError: error }));
      }
    })();
  }, [condition]);

  return [userinfo, setUserInfo];
}

// edit user

export async function editU(url, id, credentials) {
  try {
    const { data } = await axios.put(`${BASE_URL}${url}/${id}`, credentials);
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// delete one

export async function deleteU(url, id) {
  try {
    const { data } = await axios.delete(`${BASE_URL}${url}/${id}`);
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// find one

export async function searchOne(url, name) {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, {
      params: { name },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

// get admin

export async function GetAdmin() {
  const [admin, setAdmin] = useState({ username: "", password: "", id: "" });

  useEffect(() => {
    async function getadmin() {
      try {
        const { data } = await axios.get(`${BASE_URL}/admin/get`);
        if (data) {
          setAdmin((p) => ({
            ...p,
            username: data.username,
            password: data.password,
            id: data._id,
          }));
        }
      } catch (error) {
        return error;
      }
    }
    getadmin();
  });
  return [admin, setAdmin];
}
