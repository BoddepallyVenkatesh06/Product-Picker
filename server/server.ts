import { app } from "./app";
import connectDB from "./utils/database";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload'

require('dotenv').config()

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)

// create server
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log("=================================")
    console.log(`Server started on PORT ${PORT}`)
    connectDB()
})


