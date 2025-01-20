import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

  scalar Date

  type Query {
    hello: String
    horaCerta: Date
  }

`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    horaCerta: () => new Date(),
  },
};

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is running 🚀\nurl: ${url}`);
}

main();
