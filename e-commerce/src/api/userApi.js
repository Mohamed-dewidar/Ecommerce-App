import axios from "axios";

const BASE_URL = "http://localhost:3005";

const getItemFromCart = async (item, category, uuid) => {
  let itemMatch;
  uuid = "523b1534-00d3-4c8c-b583-576882219a5a";

  let res = await axios.get(`${BASE_URL}/users/${uuid}`);
  let userCart = res.data.cart;

  itemMatch = userCart.find(
    (ele) => ele.title == item.title && ele.category == category,
  );

  return itemMatch;
};

const addToCart = async (item, category, uuid) => {
  let itemMatch;

  try {
    uuid = "523b1534-00d3-4c8c-b583-576882219a5a";
    let userRes = await axios.get(`${BASE_URL}/users/${uuid}`);
    let user = userRes.data
    let userCart = user.cart;
    
    itemMatch = userCart.find(
        (ele) => ele.title == item.title && ele.category == category,
        );
        
        if (itemMatch) {
            throw new Error("Item Exists in Cart");
        }
        
        user = {
            ...user,
            cart: [...userCart, {...item, category}]
        }
        console.log(user)


    let res = await axios.put(`${BASE_URL}/users/${uuid}`, user);
    
  } catch (e) {
    console.log(e);
  }
};

export const userApi = {
  getItemFromCart,
  addToCart,
};
