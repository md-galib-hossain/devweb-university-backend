import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path : path.join(process.cwd(), ".env")
})

export default {
    port : process.env.PORT,
    DATABASE_URL : process.env.DATABASE_URL,
    BCRYPT_SALT_ROUNDS : process.env.BCRYPT_SALT_ROUNDS,
    DEFAULT_PASS : process.env.DEFAULT_PASS,
    NODE_ENV : process.env.NODE_ENV

}