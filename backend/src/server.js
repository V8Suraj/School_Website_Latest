import app from './app.js'
import connectDB from './db/index.js';
import { portNumber } from './utils/config.js';

const port = portNumber || 5001

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`⚙️  SERVER LISTING ON PORT : ${port}`)
    })
})
 .catch((error)=>{
    console.error("ERROR : ", error.message)
 })
