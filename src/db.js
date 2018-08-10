import { isObject, filter, find } from 'lodash';

class Db {
  constructor() {
    this.rows = [];
  }

  pushRow(row) {
    if (!isObject(row)) {
      throw new Error('row must be an object');
    }

    this.rows.push(row);
  }

  find(predicate) {
    return Promise.resolve(filter(this.rows, predicate));
  }

  findOne(predicate) {
    return Promise.resolve(find(this.rows, predicate));
  }
}

export default Db;
