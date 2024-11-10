import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const parseFile = (filepath) => {
  const ext = path.extname(filepath);
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, "utf8");

  if (ext === ".json") {
    return JSON.parse(data);
  } else if (ext === ".yml" || ext === ".yaml") {
    return yaml.load(data);
  }
  throw new Error(`Unsupported file format: ${ext}`);
};
export default parseFile;
