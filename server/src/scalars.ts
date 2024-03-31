import { Kind, ValueNode } from 'graphql';
import { GraphQLScalarType } from 'graphql/type';

// Convert the Prisma JSON scalar to a GraphQL scalar
const GraphQLJSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'Arbitrary JSON data',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast: ValueNode) => {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        return Object.fromEntries(
          ast.fields.map((field) => [
            field.name.value,
            (ast as any).parseLiteral(field.value), // Recursively parse nested objects
          ]),
        );
      default:
        return null;
    }
  },
});

// Wrap the scalar in a function
const GraphQLJSON = (): GraphQLScalarType => GraphQLJSONScalar;

export default GraphQLJSON;
