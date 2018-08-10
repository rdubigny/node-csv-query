/* eslint-env mocha */
import path from 'path';
import { expect } from 'chai';
import csvdb from '..';

describe('classic dataset', () => {
  let databaseConnection = null;
  before((done) => {
    csvdb(path.join(__dirname, './fixtures/dataset.csv')).then((db) => {
      databaseConnection = db;
      done();
    }).catch(err => done(err));
  });

  it('should find 0 record', (done) => {
    databaseConnection.find({ firstName: 'Mike' }).then((records) => {
      expect(records).to.have.lengthOf(0);
      done();
    }).catch(err => done(err));
  });

  it('should find 1 record', (done) => {
    databaseConnection.find({ firstName: 'Olivier' }).then((records) => {
      expect(records).to.have.lengthOf(1);
      done();
    }).catch(err => done(err));
  });

  it('should find 2 records', (done) => {
    databaseConnection.find({ firstName: 'Alex' }).then((records) => {
      expect(records).to.have.lengthOf(2);
      done();
    }).catch(err => done(err));
  });

  it('should findOne record', (done) => {
    databaseConnection.findOne({ firstName: 'Alex' }).then((record) => {
      expect(record.firstName).to.equals('Alex');
      done();
    }).catch(err => done(err));
  });

  it('should find 2 records with an i in their first name', (done) => {
    databaseConnection.find(({ firstName }) => firstName.includes('i')).then((records) => {
      expect(records).to.have.lengthOf(2);
      done();
    }).catch(err => done(err));
  });
});

describe('custom dataset', () => {
  let databaseConnection = null;
  before((done) => {
    csvdb(path.join(__dirname, './fixtures/dataset_custom.csv'), { rtrim: true, delimiter: ';', comment: '#' }).then((db) => {
      databaseConnection = db;
      done();
    }).catch(err => done(err));
  });

  it('should find 2 records', (done) => {
    databaseConnection.find({ firstName: 'Alex' }).then((records) => {
      expect(records).to.have.lengthOf(2);
      done();
    }).catch(err => done(err));
  });
});
