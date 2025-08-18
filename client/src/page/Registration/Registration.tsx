import {
  Button,
  Divider,
  Grid2,
  Link,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import MenuItemComponent from "../../components/MenuItemComponent";
import { useRegistration } from "./Hook/useRegistration";

function Registration() {
  const {
    selected,
    isValidPhoneNumber,
    phoneNumber,
    password,
    handleRadioChange,
    handlePhoneNumberChange,
    handlePasswordChange,
  } = useRegistration();
  return (
    <>
      <div className="flex flex-col items-center bg-slate-200 h-screen pt-10">
        <Typography variant="h3" fontWeight={"bold"} color="primary">
          Murmur
        </Typography>
        <Grid2
          container
          spacing={1}
          sx={{
            backgroundColor: "white",
            padding: "20px",
            marginTop: "20px",
            border: "1px solid",
            borderRadius: "5px",
            width: "400px",
          }}
        >
          <Grid2
            size={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={"bold"} color="black">
              Create a new account
            </Typography>
            <Typography variant="subtitle1" fontWeight={"normal"} color="gray">
              It's quick and easy.
            </Typography>
          </Grid2>
          <Divider sx={{ width: "100%" }} />
          <Grid2 size={6}>
            <TextField
              id="register-firstname"
              label="First name"
              variant="outlined"
              size="small"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="register-lastname"
              label="Last name"
              variant="outlined"
              size="small"
            />
          </Grid2>
          <Grid2 size={12}>
            <Grid2 container columnSpacing={1}>
              <Grid2 size={12}>
                <Typography fontSize={12} fontWeight={"normal"} color="gray">
                  Birthday
                </Typography>
              </Grid2>
              <Grid2 size={4}>
                <MenuItemComponent
                  id="register-month"
                  menuName="Month"
                  options={[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ]}
                ></MenuItemComponent>
              </Grid2>
              <Grid2 size={4}>
                <MenuItemComponent
                  id="register-day"
                  menuName="Day"
                  options={["1", "2", "3", "4", "5"]}
                ></MenuItemComponent>
              </Grid2>
              <Grid2 size={4}>
                <MenuItemComponent
                  id="register-year"
                  menuName="Year"
                  options={["2000", "2001", "2002", "2003", "2004"]}
                ></MenuItemComponent>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={12}>
            <Grid2 container columnSpacing={1}>
              <Grid2 size={12}>
                <Typography fontSize={12} fontWeight={"normal"} color="gray">
                  Gender
                </Typography>
              </Grid2>
              <Grid2 size={4}>
                <label>
                  <Radio
                    checked={selected === "Male"}
                    onChange={handleRadioChange}
                    value="Male"
                  />
                  Male
                </label>
              </Grid2>
              <Grid2 size={4}>
                <label>
                  <Radio
                    checked={selected === "Female"}
                    onChange={handleRadioChange}
                    value="Female"
                  />
                  Female
                </label>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="Mobile number"
              variant="outlined"
              size="small"
              value={phoneNumber}
              error={isValidPhoneNumber}
              onChange={handlePhoneNumberChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <Button variant="contained" fullWidth color="success">
              Signup
            </Button>
          </Grid2>
          <Grid2 size={12}>
            <Link
              href="/login"
              underline="none"
              sx={{ color: "blue", display: "block", textAlign: "center" }}
            >
              Already have an account?
            </Link>
          </Grid2>
        </Grid2>
      </div>
    </>
  );
}

export default Registration;
