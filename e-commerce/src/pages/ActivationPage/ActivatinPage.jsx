import React, { useContext, useEffect } from "react";

import "./activation.css";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { AuthContext } from "../../context";

export function ActivatinPage() {
  const { uuid, type } = useParams();
  const navigator = useNavigate();

  const activate = async () => {
    try {
      let res = await authApi.activateUser(uuid, type);
      setTimeout(() => {
        navigator("/login");
      }, 2000);
    } catch (e) {
      navigator("../admin/Notfound");
      return;
    }
  };

  useEffect(() => {
    activate();
  }, []);

  return (
    <div className="activation d-flex justify-content-center align-items-center">
      <h1 className="p-5 text-center lead">Account Activated</h1>
    </div>
  );
}
