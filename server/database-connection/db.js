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
  host: "booksdb.cu7acqeogeq9.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "booksdb"

  "http://18.222.115.53:4010"

  const path = require("path");
const http = require("http");

  if (true) {
  server.use(express.static("build"));
  server.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

http.createServer(server).listen(4010);

 REMEMEBER TO create a images folder in build/static
 src={`${BaseUrl}/static/images/${localStorage.getItem("userImage")}`}

  path.resolve(
            __dirname,
            "../../build",
            `static/images/${req.file.filename}`
          )


  
*/
