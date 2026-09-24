import type { Config } from "ts-jest";

const config: Config = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" }, modules: "commonjs" }],
          ["@babel/preset-typescript"],
        ],
      },
    ],
  },
};

export default config;
