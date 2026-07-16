import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: [
      '.next/**',
      '.worktrees/**',
      '.superpowers/**',
      'node_modules/**',
      'payload-types.ts',
      'public/uploads/**',
    ],
  },
  ...nextVitals,
  {
    rules: {
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
