import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Media_metadata = sequelize.define(
  "mediametadatas",
  {
    media_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "medias",
        key: "id",
      },
    },
    url: {
      type: DataTypes.STRING,
    },
    format: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    width: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

export default Media_metadata;
