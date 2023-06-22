import {gql} from '@apollo/client'

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput) {
    saveBook(input: $input) {
        _id
        username
       savedBooks {
        authors
        Description
        bookId
        image
        link
        title
       }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook(  $bookId: String!){
    removeBook(  bookId: $bookId){
        _id
        authors
        description
        bookId
        image
        link
        title
    }
  }
`;