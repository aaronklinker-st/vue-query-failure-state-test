const tsconfig = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");
const tsJestPreset = require("ts-jest/jest-preset");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    ...tsJestPreset.transform,
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  resetMocks: true,
  globals: {
    "ts-jest": {
      tsconfig: {
        ...tsconfig.compilerOptions,
        module: "commonjs",
        target: "ES5",
      },
    },
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
