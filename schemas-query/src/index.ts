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

  type Product {
    name: String!
    price: Int!
    discount: Float!
    finalPrice: String!
  }

  type Query {
    hello: String!
    rightHour: Date!
    authUser: User!
    product: Product
  }
`;

const resolvers = {
  Product: {
    finalPrice: ({ price, discount }: { price: number; discount: number }) =>
      `R$ ${Intl.NumberFormat("pt-BR", {
        currency: "BRL",
      }).format(price - (price * discount) / 100)}`,
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

    product: () => ({
      name: "Smartphone",
      price: 6000,
      discount: 0.1,
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
