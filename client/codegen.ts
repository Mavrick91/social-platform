import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'src/graphql/**/*.ts',
  generates: {
    './src/__generated__/graphql.ts': {
      presetConfig: {
        gqlTagName: 'gql',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
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
