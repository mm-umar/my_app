import { SetStateAction, useState } from "react";
import {
  Flex,
  Card,
  Heading,
  Box,
  Text,
  TextField,
  Button,
  Callout,
} from "@radix-ui/themes";
import { useFrappeAuth } from "frappe-react-sdk";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const { currentUser, login, logout, isLoading } = useFrappeAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError("Please enter both username and password.");
      return;
    }

    console.log("Logging in with:", { username, password });
    login({ username, password })
      .then((res) => {
        if (res.message === "Logged In") {
          setLoginError(null); // Clear error on success
        } else {
          setLoginError("Unexpected response during login.");
        }
      })
      .catch((err) => {
        setLoginError(err.message || "An unknown error occurred.");
      });
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Card
        size="3"
        style={{ padding: "2rem", maxWidth: "400px", width: "100%" }}
      >
        <Heading align="center" size="3" style={{ marginBottom: "1rem" }}>
          Login
        </Heading>
        {loginError ? (
          <Callout.Root color="red">
            <Callout.Icon />
            <Callout.Text>Error: {loginError}</Callout.Text>
          </Callout.Root>
        ) : currentUser ? (
          <Callout.Root color="green">
            <Callout.Icon />
            <Callout.Text>
              Current User: {JSON.stringify(currentUser)}
            </Callout.Text>
          </Callout.Root>
        ) : null}
        {!currentUser && (
          <>
            <Box style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Text
                as="label"
                size="3"
                htmlFor="username"
                style={{ marginBottom: "0.5rem", display: "block" }}
              >
                Username/Email
              </Text>
              <TextField.Root
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setUsername(e.target.value)
                }
                size="3"
                required
              />
            </Box>
            <Box style={{ marginBottom: "1.5rem" }}>
              <Text
                as="label"
                size="3"
                htmlFor="password"
                style={{ marginBottom: "0.5rem", display: "block" }}
              >
                Password
              </Text>
              <TextField.Root
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
                size="3"
                required
              />
            </Box>
            <Button
              type="submit"
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={handleLogin}
              disabled={isLoading}
              loading={isLoading}
              size="3"
            >
              Login
            </Button>
          </>
        )}
        {currentUser && !loginError && (
          <Button
            type="submit"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={logout}
            disabled={isLoading}
            loading={isLoading}
            size="3"
          >
            Logout
          </Button>
        )}
      </Card>
    </Flex>
  );
};

export default Login;
