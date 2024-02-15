import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const User = sequelize.define(
  "users",
  {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    otp: {
      type: DataTypes.STRING,
    },
    otp_expiry: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

export default User;
