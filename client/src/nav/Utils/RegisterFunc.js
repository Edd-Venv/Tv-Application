const handleLoginAndResgister = async (url, name, password) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      person_name: name,
      password: password,
    }),
  });
};
export default handleLoginAndResgister;
