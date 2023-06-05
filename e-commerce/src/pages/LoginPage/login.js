import { authApi } from "../../api/authApi";

const checkDataIsWrongBeforeLogin = (user, formValues, setError, error) => {
  let resObj = {
    success: '',
    msg: ''
  }
  try {
    if (!user || user.password !== formValues.password) {
      throw new Error("Check Login Details !!!");
    }
    resObj = {
      success: 'true',
      msg: ''
    }

  } catch (e) {
    resObj = {
      success: 'false',
      msg: e.message
    }
  }
  return resObj
};

const checkIfUserIsActive = async (user, error, setError) => {
  let resObj = {
    success: '',
    msg: ''
  }
  try {
    if (user && !user.active) {
      
      throw new Error("Actviate your account, Activation mail was sent !!!");
    }
     resObj = {
      success: 'true',
      msg: ''
    }
   
  } catch (e) {
     resObj = {
      success: 'false',
      msg: e.message
    }
    let sendActiveEmailRes = await authApi.activationEmailSend(user);
  }
  return resObj
};

export const loginJS = {
  checkDataIsWrongBeforeLogin,
  checkIfUserIsActive,
};
