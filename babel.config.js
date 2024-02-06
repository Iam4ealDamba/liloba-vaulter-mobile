module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      require.resolve("react-native-reanimated/plugin"),
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  };
};
