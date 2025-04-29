const db=require("./../config/db")

const SchoolModel= async()=>{
    await db.execute(`
        CREATE TABLE IF NOT EXIST schools(
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          latitute FLOAT  NOT NULL,
          longitude FLOAT NOT NULL

        )`)
}

const InsertData=async (name,address,latitute,longitude)=>{
    return await db.execute(
   'INSERT TABLE schools (name,address,latitute,longitude) VALUES (?,?,?,?)',
   [name,address,latitute,longitude]

    )
}

const getSchools=async ()=>{
    const [rows]=await db.execute(`select * from schools`)
    return rows
}

module.exports = {
    createSchoolTable,
    insertSchool,
    getAllSchools,
  };
