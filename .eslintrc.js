module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // ...
    'prettier/prettier': ['error', { singleQuote: true, bracketSpacing: true }],
    quotes: ['error', 'single', 'avoid-escape'],
  },
};
