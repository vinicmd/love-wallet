module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  spaceBeforeFunctionParen: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^(fully-react/(.*)$)|^(fully-react$)',
    '<THIRD_PARTY_MODULES>',
    '^node:(.*)$',
    '^[./]'
  ],
  importAttributes: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: '**/*.md',
      options: {
        tabWidth: 2,
        useTabs: false
      }
    },
    {
      files: '**/package.json',
      options: {
        tabWidth: 2,
        useTabs: false
      }
    }
  ]
}
