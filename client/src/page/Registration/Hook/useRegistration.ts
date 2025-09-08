import React from "react";
import { userService } from "../../../services/user.service";
import { generateString } from "../../../shared/utils/generateString";
import { useNavigate } from "react-router";

const { registerUser } = userService();
type Birthday = { month: string; day: string; year: string };

export const useRegistration = () => {
  const register = registerUser();
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [birthday, setBirthday] = React.useState<Birthday>({
    month: "Jan",
    day: "1",
    year: "2025",
  });
  const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };
  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };
  const handleBirthdayChange = (event: any) => {
    setBirthday(event.target.value);
  };
  const handlePhoneNumberValidation = (phoneNumber: string) => {
    if (phoneNumber.length == 11 && phoneNumber[0] == "0") {
      setIsValidPhoneNumber(false);
    } else if (phoneNumber.length == 13 && phoneNumber[0] == "+") {
      setIsValidPhoneNumber(false);
    } else {
      setIsValidPhoneNumber(true);
    }
  };
  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value);
    handlePhoneNumberValidation(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const currentYear = new Date().getFullYear();
  const yearsDynamic = Array.from({ length: currentYear - 1980 + 1 }, (_, i) =>
    String(currentYear - i)
  );

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const { username: generatedUsername, emailLocal } = generateString([
      firstName,
      lastName,
    ]);
    console.log(generatedUsername, emailLocal);

    register.mutate(
      {
        firstname: firstName,
        lastname: lastName,
        username: generatedUsername,
        email: `${emailLocal}@murmur.com`,
        password: password,
        gender: gender,
        birthday: `${birthday.month},${birthday.day},${birthday.year}`,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          sessionStorage.setItem("token", data.token);
          navigate("/");
        },
        onError: (error: any) => {
          console.log("Registration failed", error);
        },
      }
    );
  };
  const setPart = (part: keyof Birthday) => (val: string) =>
    setBirthday((prev) => ({ ...prev, [part]: val }));

  return {
    days,
    yearsDynamic,
    firstName,
    lastName,
    gender,
    birthday,
    setBirthday,
    setPart,
    isValidPhoneNumber,
    phoneNumber,
    password,
    handleFirstNameChange,
    handleLastNameChange,
    handleGenderChange,
    handleBirthdayChange,
    handlePhoneNumberChange,
    handlePasswordChange,
    handleRegistration,
  };
};
