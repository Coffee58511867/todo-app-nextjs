import axios from "axios";

// const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export const instance2 = axios.create({
  baseURL: "https://lebelo.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export const todoinstance = axios.create({
  baseURL: "https://ionic-testing.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`, In React use it like this,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
