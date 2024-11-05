module.exports = {
  // 어떤 환경에서 실행되는지
  env: {
    browser: true, // 브라우저 전역 변수
    node: true, // Node.js 전역 변수
    es2021: true, // ES2021 문법 허용
    jest: true, // Jest 테스트 환경
  },

  // 기본 규칙 세트 설정
  extends: [
    "eslint:recommended", // ESLint 추천 규칙
    "plugin:react/recommended", // React 추천 규칙 (React 사용시)
    "plugin:@typescript-eslint/recommended", // TypeScript 추천 규칙 (TS 사용시)
    "prettier", // Prettier와 충돌 방지
  ],

  // 파서 설정
  parser: "@typescript-eslint/parser", // TypeScript 사용시

  // 파서 옵션
  parserOptions: {
    ecmaVersion: 12, // ES2021
    sourceType: "module", // import/export 허용
    ecmaFeatures: {
      jsx: true, // JSX 허용
    },
  },

  // 사용할 플러그인
  plugins: ["react", "@typescript-eslint", "prettier"],

  // 세부 규칙
  rules: {
    // 에러 수준: 'off' or 0, 'warn' or 1, 'error' or 2

    // 일반적인 규칙
    "no-console": "warn", // console.log() 사용시 경고
    "no-unused-vars": "warn", // 미사용 변수 경고
    "prefer-const": "error", // let 대신 const 사용 강제

    // React 규칙 (React 사용시)
    "react/prop-types": "off", // PropTypes 검사 비활성화
    "react/react-in-jsx-scope": "off", // React 17+ 에서는 import React 불필요

    // TypeScript 규칙 (TS 사용시)
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",

    // 들여쓰기 규칙
    indent: ["error", 2], // 2칸 들여쓰기

    // 세미콜론 규칙
    semi: ["error", "always"], // 세미콜론 필수

    // 따옴표 규칙
    quotes: ["error", "single"], // 작은따옴표 사용

    // 후행 쉼표 규칙
    "comma-dangle": ["error", "always-multiline"],
  },

  // 특정 파일에 대한 규칙 덮어쓰기
  overrides: [
    {
      files: ["*.test.js", "*.spec.js"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
  ],

  // 전역 변수 설정
  globals: {
    process: true,
    __dirname: true,
  },

  // 특정 파일/디렉토리 무시
  ignorePatterns: ["dist/", "build/", "node_modules/", "*.config.js"],
}
