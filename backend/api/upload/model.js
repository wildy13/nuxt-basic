const { DataTypes } = require('sequelize')
const users = require('../user/model')
const { sequelize } = require('../../config')

const content = sequelize.define(
    'content',
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },

        name : {
            type : DataTypes.STRING
        },

        zipPath : {
            type : DataTypes.STRING,
        },

        unZipPath : {
            type: DataTypes.STRING
        },

        usersId : {
            type: DataTypes. INTEGER,
            references: {
                model: users,
                key: 'id'
            }
        },
    },
    {
        tableName : 'tblContent'
    }

    
);
module.exports = content