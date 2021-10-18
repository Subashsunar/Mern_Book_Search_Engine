import { gql } from
"@apollo/client";

export const ADD_USER = gql`
mutation createUser($user: UserInput) {
    addUser(user: $user) {
        token,
        user {
            username,
            bookCount
        }
    }
}
`

export const LOGIN_USER = gql`
mutation logUser($user: UserInput) {
    login(user: $user) {
        token,
        user {
            username,
            bookCount
        }
    }
}
`

export const SAVE_BOOK = gql`
mutation savedBook($book: BookInput, $token: String!) {
    saveBook(book: $book, token: $token) {
        username,
        bookCount 
    }
}
`

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!, $token: String!) {
    removeBook(bookId: $bookId, token: $token) {  
        username,
        bookCount
 
    }
}
`