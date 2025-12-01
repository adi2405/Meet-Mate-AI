"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Registration Successfull !");
        },
        onError: () => {
          window.alert("Something went wrong!");
        },
      }
    );
  };

  const onSignIn = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Login Successfull!");
        },
        onError: () => {
          window.alert("Something went wrong!");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col space-y-4 justify-center items-center p-8">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Logout</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-8">
      <div className="w-full flex flex-col space-y-4 justify-start items-center p-8">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSignUp} className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="w-full flex flex-col space-y-4 justify-start items-center p-8">
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSignIn} className="w-full">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Page;
