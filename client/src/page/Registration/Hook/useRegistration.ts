import React from "react";

export const useRegistration = () => {
  const [selected, setSelected] = React.useState("Male");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };
  const handlePhoneNumberValidation = (phoneNumber: string) => {
    if (phoneNumber == "ivan") {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  };
  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
    handlePhoneNumberValidation(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return {
    selected,
    isValidPhoneNumber,
    phoneNumber,
    password,
    handleRadioChange,
    handlePhoneNumberChange,
    handlePasswordChange,
  };
};
