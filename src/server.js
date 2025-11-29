const { createApp, registerRustHotpath } = require("brahma-firelight");
const app = createApp();
const path = require('path');
const fs = require("fs")
const mime = require("mime-types");
                   
function walkSync(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach((f) => {
        const full = path.join(dir, f);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            walkSync(full, filelist);
        } else {
            filelist.push(full);
        }
    });
    return filelist;
}

function registerDist(distDir, mountPrefix = "") {
  const files = walkSync(distDir);
  const normalizedPrefix = (mountPrefix || "").replace(/\/+$/,""); 

  files.forEach((fullPath) => {
    const rel = path.relative(distDir, fullPath).split(path.sep).join("/"); 
    let urlPath = (normalizedPrefix + "/" + rel).replace(/\/+/g, "/"); // e.g. "/index.html" or "/assets/app.js"
    if (!urlPath.startsWith("/")) urlPath = "/" + urlPath;

    const buf = fs.readFileSync(fullPath);
    const type = mime.lookup(fullPath) || "application/octet-stream";
    const headers = JSON.stringify({
      "Content-Type": type,
      "Content-Length": String(buf.length),
      "Cache-Control": "public, max-age=3600"
    });

    // register the exact file path (as before)
    registerRustHotpath("GET", urlPath, 200, headers, buf, false);
    // If this is an index.html, also register the directory routes:
    // dist/index.html  ->  "/", "/"
    const relLower = rel.toLowerCase();
    if (relLower.endsWith("/index.html") || relLower === "index.html") {
      let dirPath = urlPath.replace(/index\.html$/i, "");
      if (dirPath === "") dirPath = "/";
      const altDir = dirPath.endsWith("/") && dirPath !== "/" ? dirPath.slice(0, -1) : dirPath + "/";

      registerRustHotpath("GET", dirPath, 200, headers, buf, false);
      if (altDir !== dirPath) registerRustHotpath("GET", altDir, 200, headers, buf, false);
    }
  });
}

const dist = path.join(process.cwd(), "dist");
if (!fs.existsSync(dist)) {
    throw new Error("dist folder not found: " + dist);
}

registerDist(dist, "/");


      
// React-API Routes 
app.get("/api/hi", (req, res) => res.json({ msg: "Hello from Brahma" }));
app.post("/api/echo", (req, res) => res.json((req.body.toString('utf-8') || "{}")));


app.listen("0.0.0.0",2000,()=>console.log("Listening on 2000"));
// GRACEFUL shutdown handled safely with TOKIO
process.on("SIGINT",async()=>{await app.close(1000);process.exit(0);});