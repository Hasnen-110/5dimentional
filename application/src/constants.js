export const constants = {
    LINK : 'http://localhost:5000',

    SECRET: '5DimEnSiOn', 

    TOKEN_STR: (token) => ({"x-authorization": "Bearer "+token })
}