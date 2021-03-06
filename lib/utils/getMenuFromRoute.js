"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _memoizeOne() {
  const data = _interopRequireDefault(require("memoize-one"));

  _memoizeOne = function _memoizeOne() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Conversion router to menu.
 * - menu 中的全部参数，支持平铺式写法, menu 中的优先级更高
 * - indexRoute 已经被前置插件处理打平处理掉了
 * - menu 国际化
 */
function formatter(baseRoutes = [], prefix = '', base = '/') {
  const menus = (0, _lodash().flatten)(baseRoutes.filter(item => item && !item.unaccessible && ( // 是否没有权限查看
  item.name || // 兼容老版本 route 配置
  item.flatMenu || // 是否打平 menu
  item.menu && (item.menu.name || item.menu.flatMenu) || // 正确配置了 menu
  item.indexRoute && item.indexRoute.menu && (item.indexRoute.menu.name || item.indexRoute.menu.flatMenu)) // 有 indexRoute 且正确配置了中的 menu
  ).map(route => {
    const _route$menu = route.menu,
          menu = _route$menu === void 0 ? {} : _route$menu,
          indexRoute = route.indexRoute,
          _route$path = route.path,
          path = _route$path === void 0 ? '' : _route$path,
          routes = route.routes;
    const _ref = menu,
          _ref$name = _ref.name,
          name = _ref$name === void 0 ? route.name : _ref$name,
          _ref$icon = _ref.icon,
          icon = _ref$icon === void 0 ? route.icon : _ref$icon,
          _ref$hideChildren = _ref.hideChildren,
          hideChildren = _ref$hideChildren === void 0 ? route.hideChildren : _ref$hideChildren,
          _ref$flatMenu = _ref.flatMenu,
          flatMenu = _ref$flatMenu === void 0 ? route.flatMenu : _ref$flatMenu; // 兼容平铺式写法
    // 拼接 path

    const absolutePath = path.startsWith('/') || path.startsWith('http') ? path : `${base}${base === '/' ? '' : '/'}${path}`; // 拼接 childrenRoutes, 处理存在 indexRoute 时的逻辑

    const childrenRoutes = indexRoute ? [_objectSpread({
      path,
      menu
    }, indexRoute)].concat(routes || []) : routes; // 拼接返回的 menu 数据

    const result = {
      name,
      path: path.startsWith('http') ? absolutePath : `${prefix}${absolutePath}`
    };

    if (icon) {
      result.icon = icon;
    }

    if (childrenRoutes && childrenRoutes.length) {
      /** 在菜单中隐藏子项 */
      if (hideChildren) {
        delete result.children;
        return result;
      }

      const children = formatter(childrenRoutes, prefix, absolutePath);
      /** 在菜单中只隐藏此项，子项往上提，仍旧展示 */

      if (flatMenu) {
        return children;
      }

      result.children = children; // delete result.path;
    }

    return result;
  }));
  return menus;
} // 参数深比较


const getMenuFromRoute = (0, _memoizeOne().default)(formatter, _lodash().isEqual);
var _default = getMenuFromRoute;
exports.default = _default;