'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeFailure = exports.makeSuccess = exports.expandDefers = exports.reducer = exports.thunk = exports.action = exports.log = undefined;

var _ramda = require('ramda');

var _labels = require('./labels');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var util = require('util');
var log = exports.log = function log(obj) {
  console.log(util.inspect(obj, false, null));
};

var action = {
  empty: function empty() {
    return {};
  },
  error: function error(_error) {
    return { error: _error };
  },
  payload: function payload(_payload) {
    return { payload: _payload };
  },
  type: function type(_type) {
    return { type: _type };
  }
};

exports.action = action;
var thunk = exports.thunk = {
  promise: function promise() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    switch (args.length) {

      case 1:
        return function () {
          for (var _len2 = arguments.length, as = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            as[_key2] = arguments[_key2];
          }

          return function (dispatch) {
            return args[0].apply(args, as).then(dispatch);
          };
        };

      case 2:
        return function (p) {
          for (var _len3 = arguments.length, as = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            as[_key3 - 1] = arguments[_key3];
          }

          return function (dispatch) {
            return p.apply(undefined, as).then(args[0], args[1]).then(dispatch);
          };
        };

      case 3:
        return function () {
          for (var _len4 = arguments.length, as = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            as[_key4] = arguments[_key4];
          }

          return function (dispatch) {
            return args[0].apply(args, as).then(args[1], args[2]).then(dispatch);
          };
        };

      default:
        return action.empty;
    }
  }
};

var setAsyncFlag = (0, _ramda.curry)(function (b, n, fn) {
  return function (s, a) {
    return (0, _ramda.assocPath)([_labels.ASYNC, n], b, (fn || _ramda.identity)(s, a));
  };
});

var reducer = exports.reducer = {
  set: function set(s, a) {
    return (0, _ramda.propOr)({}, 'payload')(a);
  },
  merge: function merge(s, a) {
    return (0, _ramda.merge)(s, (0, _ramda.propOr)({}, 'payload', a));
  },
  async: {
    defer: setAsyncFlag(true),
    success: setAsyncFlag(false),
    failure: setAsyncFlag(false)
  }
};

var expandDefers = exports.expandDefers = function expandDefers(d) {
  var _defer;

  if (!d[_labels.PROMISE]) {
    return [d];
  }
  var succ = makeSuccess(d);
  var fail = makeFailure(d);
  var defer = (_defer = {}, _defineProperty(_defer, _labels.NAME, d[_labels.NAME]), _defineProperty(_defer, _labels.TYPE, d[_labels.TYPE] || d[_labels.NAME]), _defineProperty(_defer, _labels.ACTION, function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return function (dispatch) {
      return d[_labels.PROMISE].apply(d, args).then(succ[_labels.ACTION], fail[_labels.ACTION]).then(dispatch);
    };
  }), _defineProperty(_defer, _labels.REDUCER, reducer.async.defer(d[_labels.TYPE], d[_labels.REDUCER])), _defer);
  return [defer, succ, fail];
};

var makeSuccess = exports.makeSuccess = function makeSuccess(d) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, _labels.NAME, d[_labels.NAME] + 'Success'), _defineProperty(_ref, _labels.TYPE, (d[_labels.TYPE] || d[_labels.NAME]) + '/success'), _defineProperty(_ref, _labels.ACTION, d[_labels.THEN] || action.payload), _defineProperty(_ref, _labels.REDUCER, reducer.async.success(d[_labels.TYPE], d[_labels.REDUCER])), _ref;
};

var makeFailure = exports.makeFailure = function makeFailure(d) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, _labels.NAME, d[_labels.NAME] + 'Failure'), _defineProperty(_ref2, _labels.TYPE, (d[_labels.TYPE] || d[_labels.NAME]) + '/failure'), _defineProperty(_ref2, _labels.ACTION, d[_labels.CATCH] || action.error), _defineProperty(_ref2, _labels.REDUCER, reducer.async.failure(d[_labels.TYPE], d[_labels.REDUCER])), _ref2;
};