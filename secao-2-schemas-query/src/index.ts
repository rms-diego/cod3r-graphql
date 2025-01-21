import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  salary: string;
  vip: boolean;
};

const users: User[] = [
  {
    id: crypto.randomUUID(),
    age: 24,
    email: "some.mail@email.com",
    name: "John Doe",
    salary: "2000.58",
    vip: true,
  },
  {
    id: crypto.randomUUID(),
    age: 30,
    email: "some.mail@email.com",
    name: "foo",
    salary: "4000.00",
    vip: true,
  },
  {
    id: crypto.randomUUID(),
    age: 50,
    email: "some.mail@email.com",
    name: "Aobandinho",
    salary: "15000.00",
    vip: true,
  },
];

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
    getUser: User!
    product: Product
    lotteryNumbers: [Int!]!
    getUsers: [User!]!
    getById(id: ID!): User
  }
`;

const resolvers = {
  Product: {
    finalPrice: ({ price, discount }: { price: number; discount: number }) =>
      `R$ ${Intl.NumberFormat("pt-BR", {
        currency: "BRL",
      }).format(price - (price * discount) / 100)}`,
  },

  User: {
    salary: (user: User) => {
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(user.salary));
    },
  },

  Query: {
    hello: () => "Hello, world!",
    rightHour: () => new Date(),
    getUser: () => ({
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
    lotteryNumbers: () =>
      Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 1).sort(),
    getUsers: () => users,
    getById: (_, { id }: { id: string }) => users.find((user) => user.id === id),
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
