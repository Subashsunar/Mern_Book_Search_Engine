import { gql, useQuery } from
"@apollo/client";

export const USER = gql`
    query getUser($token: String!){
        me(token: $token) {
    
            username,
            email,
            SavedBooks
        }
    }
`
// export const  getUser = () => {
//     const { loading, data } = useQuery(USER);
//     if (loading) {
//         return <p> Lodaing user</p>
//     }
//     return data;
// }