import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import multer from "multer";
import hbs from "hbs";

const app = express();
const port = process.env.PORT || 3000;

// === ESM Compatibility ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === PostgreSQL Connection ===
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// === Multer Storage Configuration ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// === View Engine: Handlebars ===
app.set("view engine", "hbs");
app.engine("hbs", hbs.__express);
app.set("views", path.join(__dirname, "src", "views"));

// === Static File Middleware ===
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "src", "assets")));
app.use(express.urlencoded({ extended: true }));

// === Health Check Route ===
app.get("/health", (req, res) => {
  res.send("✅ App is running");
});

// === Homepage - Display All Projects ===
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM project ORDER BY id DESC");

    const projects = result.rows.map((project) => ({
      ...project,
      technologies:
        typeof project.technologies === "string"
          ? project.technologies.split(",").map((t) => t.trim())
          : [],
    }));

    res.render("index", { projects });
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).send("Internal Server Error");
  }
});

// === Add Project Form ===
app.get("/add-project", (req, res) => {
  res.render("add-project");
});

// === Handle Form Submission ===
app.post("/add-project", upload.single("upload"), async (req, res) => {
  try {
    const { project_name, description, technologies, github_link } = req.body;

    const fileName = req.file ? `/uploads/${req.file.filename}` : null;

    const techString = Array.isArray(technologies)
      ? technologies.join(", ")
      : technologies;

    await db.query(
      `INSERT INTO project (project_name, description, technologies, github, upload)
       VALUES ($1, $2, $3, $4, $5)`,
      [project_name, description, techString, github_link, fileName]
    );

    res.redirect("/");
  } catch (err) {
    console.error("❌ Error saving project:", err);
    res.status(500).send("Failed to save project");
  }
});

// === Start Server ===
app.listen(port, () => {
  console.log(`✅ App listening on http://localhost:${port}`);
});
