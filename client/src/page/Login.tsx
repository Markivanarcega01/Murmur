import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { userService } from "../services/user.service";
import React from "react";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = userService();

  const login = loginUser();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess: (data) => {
          sessionStorage.setItem("token", data.token);
          console.log("Login successful:", data);
          navigate("/");
        },
        onError: (error: any) => {
          console.log("Login failed", error);
        },
      }
    );
  };

  console.log(login);

  return (
    <form onSubmit={handleLogin}>
      <Grid2 container sx={{ height: "100vh", bgcolor: "#E2E8F0" }}>
        <Grid2
          size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "end", md: "center" },
            marginBottom: "20px",
          }}
        >
          <Grid2 size={{ xs: 6, md: 7 }}>
            <Typography
              sx={{
                fontSize: { xs: "50px", md: "70px" },
                fontWeight: "bold",
                textAlign: { xs: "center", md: "start" },
              }}
              color="primary"
            >
              Murmur
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "20px", md: "25px" },
                opacity: 0.8,
                textAlign: { xs: "center", md: "start" },
                textWrap: { xs: "wrap", md: "nowrap" },
              }}
              color="textSecondary"
            >
              Connect with friends and the world around you on Murmur
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "start", md: "center" },
          }}
        >
          <Grid2
            container
            sx={{ bgcolor: "white", padding: "20px", borderRadius: "8px" }}
            size={6}
            rowSpacing={1}
          >
            <Grid2 size={12}>
              <TextField
                id="login-email"
                label="Email or phone number"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id="login-password"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ fontWeight: "bold" }}
              >
                Login
              </Button>
            </Grid2>
            <Grid2 size={12}>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Create new account
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </form>
  );
}

export default Login;
