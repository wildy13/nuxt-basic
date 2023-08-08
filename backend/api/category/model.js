const { DataTypes } = require('sequelize')
const users = require('../user/model')
const { sequelize } = require('../../config')

const category = sequelize.define(
    'category',
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },

        name : {
            type : DataTypes.STRING,
            allowNull: false
        },

        path : {
            type : DataTypes.STRING
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
        tableName : 'tblCategory'
    }

    
);
module.exports = category