import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        savedBooks {
          title
          description
          bookId
          authors
          image
        }
    }
  }
`;