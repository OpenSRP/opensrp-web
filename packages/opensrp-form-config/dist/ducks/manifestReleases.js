"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getAllManifestReleasesArray = exports.getManifestReleasesById = exports.getAllManifestReleasesById = exports.removeManifestReleases = exports.fetchManifestReleases = exports.releasesReducerName = void 0;

var _reducerFactory = require("@opensrp/reducer-factory");

var releasesReducerName = 'manifestReleases';
exports.releasesReducerName = releasesReducerName;
var releasesReducer = (0, _reducerFactory.reducerFactory)(releasesReducerName);
var fetchManifestReleases = (0, _reducerFactory.fetchActionCreatorFactory)(releasesReducerName, 'identifier');
exports.fetchManifestReleases = fetchManifestReleases;
var removeManifestReleases = (0, _reducerFactory.removeActionCreatorFactory)(releasesReducerName);
exports.removeManifestReleases = removeManifestReleases;
var getAllManifestReleasesById = (0, _reducerFactory.getItemsByIdFactory)(releasesReducerName);
exports.getAllManifestReleasesById = getAllManifestReleasesById;
var getManifestReleasesById = (0, _reducerFactory.getItemByIdFactory)(releasesReducerName);
exports.getManifestReleasesById = getManifestReleasesById;
var getAllManifestReleasesArray = (0, _reducerFactory.getItemsArrayFactory)(releasesReducerName);
exports.getAllManifestReleasesArray = getAllManifestReleasesArray;
var _default = releasesReducer;
exports["default"] = _default;