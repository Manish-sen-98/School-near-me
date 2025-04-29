const db = require("../config/db");

const SchoolModel = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schools(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `);
};

const insertData = async (name, address, latitude, longitude) => {
  return await db.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );
};

const getAllSchools = async () => {
  const [rows] = await db.execute(`SELECT * FROM schools`);
  return rows;
};

module.exports = {
  SchoolModel,
  insertData,
  getAllSchools,
};
