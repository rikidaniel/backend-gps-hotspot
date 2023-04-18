import {Sequelize} from "sequelize";

const db = new Sequelize('voucher_hotspot','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;