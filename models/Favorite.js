import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Favorite = sequelize.define(
  "favorites",
  {
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    viewed_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "views",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export default Favorite;
