import _ from 'lodash';

const genDiff = (fileOne, fileTwo) =>{
    const allKeys = _.uniq(_.sortBy([...Object.keys(fileOne), ...Object.keys(fileTwo)]));
    const diff = allKeys.map((key) => {
        if(!fileOne.hasOwnProperty(key)){
            return ` + ${key}: ${fileTwo[key]}`;
        }
        if(!fileTwo.hasOwnProperty(key)){
            return ` - ${key}: ${fileOne[key]}`;
        }
        if(fileOne[key] !== fileTwo[key]){
            return ` - ${key}: ${fileOne[key]}\n + ${key}: ${fileTwo[key]}`;
        }
        return `   ${key}: ${fileOne[key]}`;
    });
    return `{\n${diff.join('\n')}\n}`;
}

export default genDiff;