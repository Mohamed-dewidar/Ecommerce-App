import axios from "axios";

const BASE_URL = "http://localhost:3005/";


const addUser = (user) => axios.post(`${BASE_URL}users`, user)

const getUser = async (user, type) => {
    let res;
    if(type==='admin'){
        res = await getAdmin(user)
        console.log(res)
        return res
    }
    if(type==='customer'){
        
        res = await getCustomer(user)
        console.log(res)
        return res
    }
}
const getCustomer = async (user) => {
  let ans;
  try {
    let res = await axios.get(`${BASE_URL}users`);
    let data = res.data["users"];
    ans = data.find((e) => e["email"] === user);
    if (!ans) {
      throw new Error("Email doesn't exits");
    }
  } catch (e) {
    console.log(e);
  }
  return ans;
};

const getAdmin = async (user) => {
  let ans;
  try {
    let res = await axios.get(`${BASE_URL}admins`);
    let data = res.data["admins"];
    ans = data.find((e) => e["email"] === user);
    if (!ans) {
      throw new Error("Email doesn't exits");
    }
  } catch (e) {
    console.log(e);
  }
  return ans;
};

export const authApi = {
  getUser,
  addUser
};
