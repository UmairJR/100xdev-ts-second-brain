import React, { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import axios from "axios";
import { BackendURL } from "../config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username, password);
    try {
        const res = await axios.post(`${BackendURL}/signin`, {
            username,
            password,
        });
        const token = res.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        alert("SignIn successful");
        navigate("/dashboard");
    } catch (error) {
        alert("Error occured while signing up - " + error);
    }
    setLoading(false);
  };
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" onChange={() => {}} />
        <Input ref={passwordRef} type="password" placeholder="Password" onChange={() => {}} />
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            size="medium"
            text="Sign In"
            fullWidth={true}
            loading={loading}
            onClick={() => {
              signIn();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
