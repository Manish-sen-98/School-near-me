const schools = require('./../models/School.model');

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    await schools.insertData(name, address, parseFloat(latitude), parseFloat(longitude));
    res.status(201).json({ message: "School added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add school" });
  }
};

const listschools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const allSchools = await schools.getAllSchools();

    const toRad = (value) => (value * Math.PI) / 180;

    const schoolsWithDistance = allSchools.map((school) => {
      const R = 6371;
      const dLat = toRad(school.latitude - userLat);
      const dLon = toRad(school.longitude - userLon);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(userLat)) *
        Math.cos(toRad(school.latitude)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve schools" });
  }
};

module.exports = { addSchool, listschools };
