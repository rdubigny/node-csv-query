'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFromFile(filePath) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var db = new _db2.default();

  var parser = (0, _csvParse2.default)((0, _lodash.merge)(options, { columns: true }));

  return new Promise(function (resolve, reject) {
    _fs2.default.createReadStream(filePath).pipe(parser).on('data', db.pushRow.bind(db)).on('error', reject).on('finish', function () {
      return resolve(db);
    });
  });
}

exports.default = createFromFile;