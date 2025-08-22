// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import hexagonal from 'eslint-plugin-hexagonal-architecture';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  // General rules
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          custom: {
            regex: '^[a-zA-Z]+Enum',
            match: true,
          },
        },
      ],
    },
  },
  // Hexagonal Architecture Rules
  {
    files: ['src/**/*.ts'],
    plugins: {
      'hexagonal-architecture': hexagonal,
    },
    settings: {
      hexagonal: {
        rootDir: 'src',
        layers: ['application', 'domain', 'infrastructure'],
      },
    },
    rules: {
      'hexagonal-architecture/enforce': 'error',
    },
  },
  {
    files: ['src/app.module.ts', 'src/main.ts'],
    rules: {
      'hexagonal-architecture/enforce': 'off',
    },
  },
);
