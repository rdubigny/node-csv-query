import csvParse from 'csv-parse';
import fs from 'fs';
import { merge } from 'lodash';
import Db from './db';

function createFromFile(filePath, options = {}) {
  const db = new Db();

  const parser = csvParse(merge(options, { columns: true }));

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parser)
      .on('data', db.pushRow.bind(db))
      .on('error', reject)
      .on('finish', () => resolve(db));
  });
}

export default createFromFile;
