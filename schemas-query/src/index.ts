import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  scalar Date

  # basic types graphql 
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    salary: String!
    vip: Boolean!
  }

  type Query {
    hello: String!
    rightHour: Date!
    authUser: User!
  }

`;

const resolvers = {
  User: {
    salary: (user: { salary: number }) => {
      return `R$ ${Intl.NumberFormat("pt-BR", {
        currency: "BRL",
      }).format(user.salary)}`;
    },
  },

  Query: {
    hello: () => "Hello, world!",
    rightHour: () => new Date(),
    authUser: () => ({
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "some.mail@email.com",
      age: 24,
      salary: 2000.58,
      vip: true,
    }),
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
