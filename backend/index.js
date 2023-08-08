const express = require('express')
const router = require('./router')
const cors = require('cors')
const { sequelize, config: { host, port } } = require('./config');
const { verifyToken } = require('./api/auth/service');
const user = require('./api/user/model');
const upload = require('./api/upload/model');
const category = require('./api/category/model');


const app = express();
app.use(cors());
app.use(express.json());
app.use(verifyToken);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('connection has been estabilished successfully')
    } catch (error) {
        console.log(error)
    }
}

const start = async () => {
    try {
        router(app)
        // category.sync({force:true})
        app.listen ({ port, host }, () => console.log(`Server Running on Port ${port}`));
        await connect();
    } catch (error) {
        console.log(error)
    }
}

start()