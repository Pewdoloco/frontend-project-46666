import fs from 'fs';
import path from 'path';

const parseFile = (filepath) =>{
    const absolutePath = path.resolve(process.cwd(), filepath);
    const data = fs.readFileSync(absolutePath);
    return JSON.parse(data);
};
export default parseFile;