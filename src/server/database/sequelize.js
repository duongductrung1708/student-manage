import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "dpg-ckn2muv83ejs7399mbl0-a",
  username: "user",
  password: "cJ3lDUYe26RH2mULL0Nlkhhvbz4AZGrj",
  database: "studentmanage_4vjo",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const Student = sequelize.define(
  "student",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// (async () => {
//   console.log("sync");
//   await sequelize.sync({ force: true });
// })();
