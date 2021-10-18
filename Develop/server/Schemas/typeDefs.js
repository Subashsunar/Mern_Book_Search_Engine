const { gql } = require('apollo-server-express');

module.exports = gql`

type Query {
    me(token: String!): User
}

type Mutation {
    login(user: UserInput): Auth
    addUser(user: UserInput): Auth
    saveBook(book: BookInput): User
    removeBook(bookId: ID!, token: String!): User
}

input UserInput {
    username: String
    email: String
    password: String!
}

input BookInput {
    userId: ID!
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
}
type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: String!
    user: User
}`;