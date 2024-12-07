import React, { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { BackendURL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async () => {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username, password);
    try {
        const res = await axios.post(`${BackendURL}/signup`, {
            username,
            password,
        });
        alert("Signup successful");
        navigate("/signin");
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
            text="Sign Up"
            fullWidth={true}
            loading={loading}
            onClick={() => {
              signUp();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
