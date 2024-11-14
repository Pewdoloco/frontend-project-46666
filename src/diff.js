import parseFile from './parsers.js';
import formatters from './formatters/index.js';
import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  return keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: buildDiffTree(obj1[key], obj2[key]) };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1Data = parseFile(filepath1);
  const file2Data = parseFile(filepath2);

  const diffTree = buildDiffTree(file1Data, file2Data);
  const formatter = formatters(formatName);

  return formatter(diffTree);
};

export default genDiff;
