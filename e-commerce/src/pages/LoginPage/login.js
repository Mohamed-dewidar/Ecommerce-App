import { authApi } from "../../api/authApi";



const checkDataIsWrongBeforeLogin = (user, formValues, setError, error) => {
    if (!user || user.password !== formValues.password) {
      setError({
        ...error,
        submit: true,
        submitText: "Check Your Login Details !!!!",
      });
      throw new Error('Check Login Details !!!')
    }
}

const checkIfUserIsActive = async (user, error, setError) => {
  if (!user.active) {
      console.log(user.active)
      setError({
        ...error,
        submit: true,
        submitText: "Activate Your Account, Activation Email was Sent",
      });
      let sendActiveEmailRes = await authApi.activationEmailSend(user)
      throw new Error('Actviate your account !!!')
    }
    
}


export const loginJS = {
    checkDataIsWrongBeforeLogin,
    checkIfUserIsActive
}