import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'src/**/*.ts',
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
  pluckConfig: {
    modules: [
      {
        name: '@apollo/client',
        identifier: 'gql',
      },
    ],
  },
};

export default config;
