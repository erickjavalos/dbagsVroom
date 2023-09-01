import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNIN_USER } from "../../utils/mutations";
import Authentication from "../../components/Authentication";
import Mfer from "../../assets/icon/Mfer.png";
import LogoGuy from "../../assets/icon/LogoGuy.jpg";

const Login = () => {
  const [signinMutation, { loading, error }] = useMutation(SIGNIN_USER);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = async () => {
    // Reset error message
    setErrorMessage("");

    // Replace these with the actual values from your form inputs
    const DiscordID = "example-discord-id";
    const password = "example-password";
    const email = "example@email.com";

    try {
      // Trigger the mutation
      const { data } = await signinMutation({
        variables: {
          DiscordID,
          password,
          email,
        },
      });

      // Handle success (e.g., store token in local storage or redirect)
      const token = data.signup.token;
      // ... Handle success logic ...
    } catch (error) {
      // Handle error
      console.error("Error signing up:", error);
      // Update error message state
      setErrorMessage("Login failed. Please check your credentials and try again Mfer.");
    }
  };

  return (
    <div className="bg-[#FE7378] h-screen overflow-hidden">
      <div className="w-96 h-96 p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="w-96 h-96 flex-col justify-start items-start gap-2.5 flex">
          <div className="w-96 h-96 relative">
            <div className="w-96 px-16 py-3.5 left-[1100px] top-[70px] absolute bg-yellow-50 rounded-sm flex-col justify-start items-center gap-7 inline-flex">
              <img
                className="w-28 h-24 relative rounded-xl"
                src={Mfer}
                alt="Mfer"
              />
              <div className="w-96 text-center text-neutral-700 text-5xl font-normal leading-9">
                Sign into your Discord Mfer
              </div>
              <div className="flex-col justify-start items-start gap-12 flex">
                <div className="h-20 flex-col justify-start items-start gap-1.5 flex">
                  <div className="w-40 text-neutral-700 text-base font-normal leading-normal">
                    Discord ID
                  </div>
                  <div className="w-80 h-12 px-3.5 py-2.5 bg-white rounded-sm shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <input
                      type="text"
                      className="grow shrink basis-0 w-full h-full px-2 text-neutral-700 text-base font-normal leading-normal border-none outline-none"
                      placeholder="Enter your Discord ID"
                    />
                  </div>
                </div>
                <div className="h-20 flex-col justify-start items-start gap-1.5 flex">
                  <div className="w-40 text-neutral-700 text-base font-normal leading-normal">
                    Username
                  </div>
                  <div className="w-80 h-12 px-3.5 py-2.5 bg-white rounded-sm shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <input
                      type="text"
                      className="grow shrink basis-0 w-full h-full px-2 text-neutral-700 text-base font-normal leading-normal border-none outline-none"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                <div className="h-20 flex-col justify-start items-start gap-1.5 flex">
                  <div className="w-40 text-neutral-700 text-base font-normal leading-normal">
                    Email
                  </div>
                  <div className="w-80 h-12 px-3.5 py-2.5 bg-white rounded-sm shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                    <input
                      type="text"
                      className="grow shrink basis-0 w-full h-full px-2 text-neutral-700 text-base font-normal leading-normal border-none outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-base font-normal leading-normal mt-2">
                  {errorMessage}
                </div>
              )}
              <div className="w-96 h-16 px-4 py-3 bg-yellow-400 rounded-sm shadow border border-neutral-700 justify-center items-center gap-2 inline-flex">
                <div
                  className="text-neutral-700 text-2xl font-medium leading-normal"
                  onClick={handleLoginClick}
                >
                  Sign In
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 h-96">
            <img
              className="w-[640px] max-w-none h-[770px] relative rounded-xl ml-12"
              src={LogoGuy}
              alt="LogoG Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
