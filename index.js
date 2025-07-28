// import express from "express";

// const app = express();
// const port = 3000;

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });

// app.set("view engine", "hbs");
// app.set("views", "src/views");
// app.use(express.static("public"));
// app.use("/assets", express.static("src/assets"));
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("index");
// });

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// === fix path untuk ES module ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// === view engine setup ===
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));

// === serve static public files === ✅ WAJIB pakai absolute path
app.use(express.static(path.join(__dirname, "public")));

// === jika kamu memang perlu assets seperti gambar/file mentah ===
app.use("/assets", express.static(path.join(__dirname, "src", "assets")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
