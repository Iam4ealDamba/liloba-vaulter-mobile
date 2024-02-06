module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      "module:@expo/knex-expo-sqlite-dialect/babel-preset",
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
