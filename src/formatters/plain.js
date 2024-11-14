import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plainFormatter = (diff) => {
  const iter = (tree, path = '') => {
    return tree
      .map((node) => {
        const propertyPath = path ? `${path}.${node.key}` : node.key;
        const { type, value, oldValue, newValue, children } = node;
  
        switch (type) {
          case 'added':
            return `Property '${propertyPath}' was added with value: ${formatValue(value)}`;
          case 'deleted':
            return `Property '${propertyPath}' was removed`;
          case 'changed':
            return `Property '${propertyPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
          case 'nested':
            return iter(children, propertyPath).join('\n');
          case 'unchanged':
            return null;
          default:
            throw new Error(`Unknown type: ${type}`);
        }
      })
      .filter(Boolean);
  };

  return iter(diff, '');
};

export default plainFormatter;
