const { DataTypes } = require('sequelize')
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sequelize } = require('../../config')

const user = sequelize.define(
    'user',
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },

        username : {
            type : DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: ' This username is already taken',
            },
        },

        password : {
            type : DataTypes.STRING,
            allowNull: false, 
            set(value) {
                const salt = genSaltSync(10);
                this.setDataValue('password', hashSync(value, salt));
            }
        },

        address : {
            type : DataTypes.STRING,
        },

        email : {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
    },
    {
        tableName : 'tblusers'
    }

    
);

user.prototype.authenticate = function compare(password) {
    const pwgen = compareSync(password, this.password);
  
    if (pwgen) {
      return true;
    }
    return false;
  };
module.exports = user