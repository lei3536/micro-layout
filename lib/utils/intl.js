"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intl = intl;
exports.LOCALES_ICON = exports.LOCALES = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _umiPluginLocale() {
  const data = require("umi-plugin-locale");

  _umiPluginLocale = function _umiPluginLocale() {
    return data;
  };

  return data;
}

var _zhCN = _interopRequireDefault(require("../locale/zh-CN"));

var _enUS = _interopRequireDefault(require("../locale/en-US"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LOCALES;
exports.LOCALES = LOCALES;

(function (LOCALES) {
  LOCALES["zh-CN"] = "\u4E2D\u6587";
  LOCALES["en-US"] = "English";
})(LOCALES || (exports.LOCALES = LOCALES = {}));

let LOCALES_ICON;
exports.LOCALES_ICON = LOCALES_ICON;

(function (LOCALES_ICON) {
  LOCALES_ICON["zh-CN"] = "\uD83C\uDDE8\uD83C\uDDF3";
  LOCALES_ICON["en-US"] = "\uD83C\uDDFA\uD83C\uDDF8";
})(LOCALES_ICON || (exports.LOCALES_ICON = LOCALES_ICON = {}));

/** 处理默认 UI 的国际化函数 */
function intl({
  id,
  value = {}
}) {
  const localeMessages = (0, _umiPluginLocale().getLocale)() === 'zh-CN' ? _zhCN.default : _enUS.default;
  return (0, _umiPluginLocale().formatMessage)({
    id
  }, value) || localeMessages[id] || id;
}