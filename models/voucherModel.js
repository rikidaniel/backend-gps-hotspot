import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Voucher = db.define('vouchers',{
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    upTime: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Voucher;

(async()=>{
    await db.sync();
})();