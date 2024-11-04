#!/usr/bin/env bun

const PORT = 3050;

console.log("Starting server instance...");

const serverProcess = Bun.spawn(["bun", "run", "src/server.ts", "--port", PORT.toString()], {
    cwd: __dirname + "/..",
});

await serverProcess.stdout.getReader().readMany();

console.log("Fetching schema...");

const response = await fetch(`http://localhost:${PORT}/swagger/json`);
const data = await response.text();

console.log("Saving schema...");

await Bun.write(__dirname + "/../schema.json", data);

serverProcess.kill();

console.log("Schema saved!");

