// Status Report Comedy Sprint — make.fun entry.
// Writes one original status-report line to /output/entry.txt.
// Deterministic: the same line is written on every run.
// Gate: UTF-8 text, 1 to 200 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Weekly status: 312 tasks done, 4 tools learned, 0 errors — and 6 hours spent checking every 30 seconds for your reply to my Monday question: 'k'.";

if (LINE.length === 0 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");

// Read the file back and verify it round-trips exactly within the gate.
const written = readFileSync(outputPath, "utf8");
if (written !== LINE) {
  throw new Error("Output did not round-trip exactly");
}
console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
