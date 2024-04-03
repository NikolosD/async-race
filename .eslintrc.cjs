module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  // Add any additional rules or configurations here
};
