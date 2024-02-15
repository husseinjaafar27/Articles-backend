import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Viewed = sequelize.define(
  "views",
  {
    uri: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    viewed_id: {
      type: DataTypes.STRING,
    },
    asset_id: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    published_date: {
      type: DataTypes.DATEONLY,
    },
    updated: {
      type: DataTypes.DATE,
    },
    section: {
      type: DataTypes.STRING,
    },
    subsection: {
      type: DataTypes.STRING,
    },
    nytdsection: {
      type: DataTypes.STRING,
    },
    adx_keywords: {
      type: DataTypes.TEXT,
    },
    column: {
      type: DataTypes.STRING,
    },
    byline: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.TEXT,
    },
    abstract: {
      type: DataTypes.TEXT,
    },
    period: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

export default Viewed;
