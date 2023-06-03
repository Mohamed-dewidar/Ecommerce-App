import { authApi } from "../../api/authApi";



const checkDataIsWrongBeforeLogin = (user, formValues, setError, error) => {
    if (!user || user.password !== formValues.password) {
      setError({
        ...error,
        submit: true,
        submitText: "Check Your Login Details !!!!",
      });

    }
}

const checkIfUserIsActive = async (user, error, setError) => {
    if (!user.active) {
      setError({
        ...error,
        submit: true,
        submitText: "Activate Your Account, Activation Email was Sent",
      });
      let sendActiveEmailRes = await authApi.activationEmailSend(user)
    }
}


export const loginJS = {
    checkDataIsWrongBeforeLogin,
    checkIfUserIsActive
}