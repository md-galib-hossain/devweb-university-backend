
import mongoose from 'mongoose'
import config from "./config"
import app from './app'


    async function main() {
        try{
        await mongoose.connect(config.DATABASE_URL);
        console.log("connected db")
        app.listen(config.port, () => {
            console.log(`Example app listening at http://localhost:${config.port}`)
          })
      
      }catch(e){
        console.log(e)
      }


    }

main()