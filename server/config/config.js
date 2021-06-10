require('dotenv').config();
module.exports = {

    application: {
        port                            : process.env.APP_PORT
    },

    database: {
        dbname                          : process.env.DB_NAME,
        dburl                           : process.env.MONGODB_URL
    },

    secret : process.env.SECRET,

    tokenExpiry : {
        user                            : process.env.TOKEN_EXPITATION_USER,
    },

    salt_work_factor                    : 10
    
}