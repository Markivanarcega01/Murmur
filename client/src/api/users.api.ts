export const usersApi = () => {
  const getUsersApi = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/v1/get-users");

    return response.json();
  };

  return { getUsersApi };
};
