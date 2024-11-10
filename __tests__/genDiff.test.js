/* eslint-env jest */
import genDiff from '../src/diff.js';
import parseFile from '../src/parcer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('genDiff with flat JSON files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const file1Data = parseFile(filepath1);
    const file2Data = parseFile(filepath2);
    
    const expectedOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(file1Data, file2Data).trim()).toEqual(expectedOutput.trim());
});
