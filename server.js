const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const GAMES_DIR = path.join(PUBLIC_DIR, "games");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function titleFromFile(fileName) {
  return fileName
    .replace(/\.html$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function listGames() {
  if (!fs.existsSync(GAMES_DIR)) return [];

  return fs
    .readdirSync(GAMES_DIR)
    .filter((name) => name.toLowerCase().endsWith(".html"))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
      id: fileName.replace(/\.html$/i, ""),
      title: titleFromFile(fileName),
      href: `/games/${encodeURIComponent(fileName)}`,
    }));
}

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const resolved = path.normalize(path.join(root, decoded));
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": data.length,
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || "/";

  if (urlPath === "/api/games") {
    sendJson(res, 200, { games: listGames() });
    return;
  }

  let requestPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = safeJoin(PUBLIC_DIR, requestPath);

  if (!filePath) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(res, filePath);
      return;
    }

    const withIndex = path.join(filePath, "index.html");
    fs.stat(withIndex, (indexErr, indexStat) => {
      if (!indexErr && indexStat.isFile()) {
        sendFile(res, withIndex);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`English Day hub listening on http://0.0.0.0:${PORT}`);
});
