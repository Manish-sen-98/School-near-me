const schoolModel = require("../models/School.model");

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Please provide valid name, address, latitude, and longitude." });
  }

  try {
    await schoolModel.insertData(name, address, parseFloat(latitude), parseFloat(longitude));
    res.status(201).json({ message: "School added successfully!" });
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ error: "Something went wrong while adding the school." });
  }
};

const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Please provide valid latitude and longitude in query." });
  }

  try {
    const schools = await schoolModel.getAllSchools();
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const schoolsWithDistance = schools.map((school) => {
      const dLat = toRad(school.latitude - userLat);
      const dLon = toRad(school.longitude - userLon);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(userLat)) *
          Math.cos(toRad(school.latitude)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return { ...school, distance: distance.toFixed(2) + " km" };
    });

    schoolsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Unable to retrieve schools." });
  }
};

module.exports = {
  addSchool,
  listSchools,
};
