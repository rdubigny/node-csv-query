'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = function () {
  function Db() {
    _classCallCheck(this, Db);

    this.rows = [];
  }

  _createClass(Db, [{
    key: 'pushRow',
    value: function pushRow(row) {
      if (!(0, _lodash.isObject)(row)) {
        throw new Error('row must be an object');
      }

      this.rows.push(row);
    }

    // TODO use the mongo driver syntax (connect, find, ...)

  }, {
    key: 'find',
    value: function find(predicate) {
      return Promise.resolve((0, _lodash.filter)(this.rows, predicate));
    }
  }, {
    key: 'findOne',
    value: function findOne(predicate) {
      return Promise.resolve((0, _lodash.find)(this.rows, predicate));
    }
  }]);

  return Db;
}();

exports.default = Db;