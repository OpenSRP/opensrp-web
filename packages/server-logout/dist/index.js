"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.defaultErrorCallback = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _serverService = require("@opensrp/server-service");

var defaultErrorCallback = function defaultErrorCallback() {
  return;
};

exports.defaultErrorCallback = defaultErrorCallback;

var logout = function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(payload, opensrpLogoutUri, keycloakLogoutUri, redirectUri) {
    var errorCallback,
        filterParams,
        fullKeycloakLogoutUri,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errorCallback = _args.length > 4 && _args[4] !== undefined ? _args[4] : defaultErrorCallback;
            filterParams = {
              redirect_uri: redirectUri
            };
            fullKeycloakLogoutUri = _serverService.OpenSRPService.getURL(keycloakLogoutUri, filterParams);
            _context.next = 5;
            return (0, _serverService.customFetch)(opensrpLogoutUri, payload).then(function () {
              window.location.href = fullKeycloakLogoutUri;
            })["catch"](function (error) {
              errorCallback(error);
            });

          case 5:
            return _context.abrupt("return", null);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logout(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.logout = logout;