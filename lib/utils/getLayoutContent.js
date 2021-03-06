"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(userConfig, path) {
  return "import React, { useState, useEffect } from \"react\";\nimport { ApplyPluginsType, useModel } from \"umi\";\nimport { plugin } from \"../core/umiExports\";\n\nexport default props => {\n  const [runtimeConfig, setRuntimeConfig] = useState(null);\n\n  const initialInfo = (useModel && useModel(\"@@initialState\")) || {\n    initialState: undefined,\n    loading: false,\n    setInitialState: null\n  }; // plugin-initial-state \u672A\u5F00\u542F\n\n  useEffect(() => {\n    const useRuntimeConfig =\n      plugin.applyPlugins({\n        key: \"mlayout\",\n        type: ApplyPluginsType.modify,\n        initialValue: initialInfo\n      }) || {};\n    if (useRuntimeConfig instanceof Promise) {\n      useRuntimeConfig.then(config => {\n        setRuntimeConfig(config);\n      });\n      return;\n    }\n    setRuntimeConfig(useRuntimeConfig);\n  }, [initialInfo?.initialState]);\n\n  const userConfig = {\n    ...".concat(JSON.stringify(userConfig).replace(/"/g, "'"), ",\n    ...runtimeConfig || {}\n  };\n\n  if(!runtimeConfig){\n    return null\n  }\n\n  return React.createElement(require(\"").concat(path, "\").default, {\n    userConfig,\n    ...props\n  });\n};\n");
};

exports.default = _default;