import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Facet = sequelize.define(
  "facets",
  {
    viewed_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "views",
        key: "id",
      },
    },
    text: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM([
        "des_facet",
        "org_facet",
        "per_facet",
        "geo_facet",
      ]),
    },
  },
  { timestamps: true }
);

export default Facet;
