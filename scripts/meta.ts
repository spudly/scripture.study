import {execSync} from 'child_process';
import browserslist from 'browserslist';
import compareVersions from '../src/utils/compareVersions';

const {
  SOURCE_VERSION = execSync(`git rev-parse HEAD`, {encoding: 'utf-8'}),
} = process.env;

const browsers = browserslist().reduce<{[key: string]: string}>(
  (map, current) => {
    const [name, version] = current.split(' ');
    if (!map[name] || compareVersions(map[name], version) > 0) {
      return {...map, [name]: version};
    }
    return map;
  },
  {},
);

process.stdout.write(`
  export const version = ${JSON.stringify(SOURCE_VERSION)};

  export const browsers = ${JSON.stringify(browsers)};
`);
