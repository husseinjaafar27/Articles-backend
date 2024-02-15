import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Media = sequelize.define(
  "medias",
  {
    viewed_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "views",
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
    },
    subtype: {
      type: DataTypes.STRING,
    },
    caption: {
      type: DataTypes.TEXT,
    },
    copyright: {
      type: DataTypes.TEXT,
    },
    approved_for_syndication: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

export default Media;
