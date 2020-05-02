const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const app = require("./app.js");

app.listen(process.env.PORT || 4010, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
