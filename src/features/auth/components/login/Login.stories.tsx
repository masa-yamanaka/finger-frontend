import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Login from "./Login";

const meta: Meta = {
  title: "Components/Login",
  component: Login,
  parameters: {
    docs: {
      description: {
        component: "Use 'admin' for username and 'password' for password",
      },
    },
  },
};

export default meta;

const Template: StoryFn = (args) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Mock validation
    if (username === "admin" && password === "password") {
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
      {...args}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {};

// Error state story
export const ErrorState = Template.bind({});
ErrorState.args = {
  username: "user@example.com",
  password: "password123",
  error: "Invalid username or password.",
};
