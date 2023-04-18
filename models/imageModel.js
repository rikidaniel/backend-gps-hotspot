import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const imageModel = db.define('images',{
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default imageModel;

(async()=>{
    await db.sync();
})();