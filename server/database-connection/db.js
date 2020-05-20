const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "0509",
  host: "localhost",
  port: 5432,
  database: "db",
});
module.exports = pool;
/*
 user: "postgres",
  password: "050993Aurum",
  host: "tvdb.cu7acqeogeq9.us-east-2.rds.amazonaws.com",
  port: 5433,
  database: "tvDB"

  "http://18.222.115.53:4010"

  const path = require("path");
const http = require("http");

  if (true) {
  app.use(express.static("build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

http.createServer(app).listen(4010);

 REMEMEBER TO create a images folder in build/static

 ADD TO CLIENT SIDE NAVIGATION/USERLOGO AND SETTINGS/CHANGEUSERPHOTO
 src={`${BaseUrl}/static/images/${localStorage.getItem("userImage")}`}

 ADD TO CONTROLLER/USERSETUP
  path.resolve(
            __dirname,
            "../../build",
            `static/images/${req.file.filename}`
          )


  
*/
