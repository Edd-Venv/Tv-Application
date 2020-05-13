const handleLoginAndRegister = async (url, name, password) => {
  const result = await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ person_name: name, password }),
    })
  ).json();
  return result;
};
export default handleLoginAndRegister;
