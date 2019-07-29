const presets = [
    [
      "@babel/preset-env",
        {
        "useBuiltIns": "usage",
        "loose": true,
        "debug": true,
        "targets": {
            "browsers": [
                "last 2 versions",
                "Firefox ESR",
                "> 1%",
                "ie >= 9",
                "iOS >= 8",
                "Android >= 4",
            ]
        }
      }
    ]
]
const plugins = [
    "@babel/plugin-transform-runtime"
]

module.exports = { plugins, presets};