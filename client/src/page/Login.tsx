import { Button, Grid2, TextField, Typography } from "@mui/material";
import { jsx } from "react/jsx-runtime";

function Login() {

  return (
    <>
      <Grid2 container sx={{ height: "100vh" }}>
        <Grid2 size={{ xs: 6, md: 7 }}>
          <div className="bg-slate-200 h-full flex items-center justify-center">
            <div>
                <Typography variant="h1" fontWeight={"bold"} color="primary">facebook</Typography>
                <Typography variant="h5" color="textSecondary" sx={{ opacity: 0.8}}>Connect with friends and the world around you on Facebook</Typography>
            </div>
          </div>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 5 }}>
          <div className="bg-slate-200 h-full flex items-center">
            <div className="flex flex-col gap-y-4 bg-slate-100 w-1/2 p-4 py-8 rounded">
              <TextField
                id="outlined-basic"
                label="Email or phone number"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
              />
              <Button variant="contained" fullWidth size="large" sx={{ fontWeight: "bold" }}>
                Login
              </Button>
              <Button variant="contained" fullWidth color="success">
                Create new account
              </Button>
            </div>
          </div>
        </Grid2>
      </Grid2>
    </>
  );
}

export default Login;
