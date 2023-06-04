import axios from "axios";

const BASE_URL = "http://localhost:3005";



const getUserCart = async (uuid) => {
      let cart = []
      let resObj = {}
    
      try{
        let res = await axios.get(`${BASE_URL}/users/${uuid}`)
        cart = res.data.cart
        resObj = {
          success: 'true',
          data: {cart}
        }
      }catch(e){
        resObj = {
          success: 'false',
          data: {cart}
        }
      }

      return resObj
}

const getItemFromCart = async (item, category, uuid) => {
  let itemMatch;

  let res = await axios.get(`${BASE_URL}/users/${uuid}`);
  let userCart = res.data.cart;

  itemMatch = userCart.find(
    (ele) => ele.title == item.title && ele.category == category,
  );

  return itemMatch;
};


const editCart = async (newCart, uuid) => {
  
  let resObj = {};
  try {
    let userRes = await axios.get(`${BASE_URL}/users/${uuid}`);
    let user = userRes.data;

    user = {
      ...user,
      cart: [...newCart],
    };

    let res = await axios.put(`${BASE_URL}/users/${uuid}`, user);
    resObj = {
      success: "true",
      msg: "Item was Deleted",
   
    };
  } catch (e) {
    resObj = { success: "false", msg: e.message };
  }

  return resObj;
};


const addToCart = async (item, category, uuid) => {
  let itemMatch;
  let resObj = {};
  try {
    let userRes = await axios.get(`${BASE_URL}/users/${uuid}`);
    let user = userRes.data;
    let userCart = user.cart;

    itemMatch = userCart.find(
      (ele) => ele.title == item.title && ele.category == category,
    );

    if (itemMatch) {
      throw new Error("Item Exists in Cart, Edit its count from cart");
    }

    user = {
      ...user,
      cart: [...userCart, { ...item, category, count: 1 }],
    };


    let res = await axios.put(`${BASE_URL}/users/${uuid}`, user);
    resObj = {
      success: "true",
      msg: "Item was added",
    };
  } catch (e) {
    resObj = { success: "false", msg: e.message };
  }

  return resObj;
};








export const userApi = {
  getUserCart,
  getItemFromCart,
  addToCart,
  editCart,
  
};
