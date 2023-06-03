// import axios from "axios";
// import emailjs from "@emailjs/browser";

// const BASE_URL = "http://localhost:3005/";

// const activateUser = async (id, userType) => {
//   let res = await getUserWithId(id, userType);
//   let user = res.data;

//   switch (user.type) {
//     case "customer":
//       return axios.put(`${BASE_URL}users/${id}`, { ...user, active: true });
//     case "admin":
//       return axios.put(`${BASE_URL}admins/${id}`, { ...user, active: true });
//   }
// };

// const activationEmailSend = async (user) => {
//   const form = {
//     name: user.name,
//     email: user.email,
//     link: `http://localhost:3000/activation/${user.type}/${user.id}`,
//   };

//   let activeEmail = await emailjs.send(
//     "service_kwu7jeq",
//     "template_fsly16o",
//     form,
//     "PhQhJO3v_56-NV2Km",
//   );
// };

// const addUser = (user, userType) => {
//   switch (userType) {
//     case "customer":
//       return axios.post(`${BASE_URL}users`, user);
//     case "admin":
//       return axios.post(`${BASE_URL}admins`, user);
//   }
// };

// const getUser = async (user, type) => {
//   let res;
//   if (type === "admin") {
//     res = await getAdmin(user);
//     return res;
//   }
//   if (type === "customer") {
//     res = await getCustomer(user);
//     return res;
//   }
// };

// const getUserWithId = (id, userType) => {
//   switch (userType) {
//     case "customer":
//       return axios.get(`${BASE_URL}users/${id}`);
//     case "admin":
//       return axios.get(`${BASE_URL}admins/${id}`);
//   }
// };

// const getCustomer = async (user) => {
//   let ans;
//   try {
//     let res = await axios.get(`${BASE_URL}users`);
//     let data = res.data;
//     ans = data.find((e) => e["email"] === user);
//     if (!ans) {
//       throw new Error("Email doesn't exits");
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   return ans;
// };

// const getAdmin = async (user) => {
//   let ans;
//   try {
//     let res = await axios.get(`${BASE_URL}admins`);
//     let data = res.data;
//     ans = data.find((ele) => ele["email"] === user);
//     if (!ans) {
//       throw new Error("Email doesn't exits");
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   return ans;
// };

// const deleteUser = (id, userType) => {
//   switch (userType) {
//     case "customer":
//       return axios.delete(`${BASE_URL}users/${id}`);
//     case "admin":
//       return axios.delete(`${BASE_URL}admins/${id}`);
//   }
// };

// export const authApi = {
//   getUser,
//   addUser,
//   activateUser,
//   activationEmailSend,
//   deleteUser
// };
