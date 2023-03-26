//models
const Farmvisit = require("../model/farmvisit");

//user profile

const bookfarmVisit = async (req, res) => {
  const { date, email, name, body } = req.body;

  try {
    const newfarmVisit = new Farmvisit({
      date,
      email,
      name,
      body,
    });
    const savedfarmVisit = await newfarmVisit.save();
    res.status(201).json(savedfarmVisit);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getfarmVisits = async (req, res) => {
  try {
    const farmVisits = await Farmvisit.find();
    if (!farmVisits) return res.status(404).json();

    res.status(200).json(farmVisits);
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
};

const getfarmVisit = async (req, res, next) => {
  const visitid = req.params.id;
  try {
    const farmVisit = await Farmvisit.findById(visitid);
    if (!farmVisit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.json([farmVisit]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletefarmVisit = async (req, res) => {
  try {
    const { id: visitid } = req.params;

    // Check if the post exists
    const farmVisit = await Farmvisit.findById(visitid);
    if (!farmVisit) {
      return res.status(404).json({ message: "farmVisit not found" });
    }

    // Delete the post and return a success message
    const removedFarmVisit = await farmVisit.remove();
    res.json(removedFarmVisit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookfarmVisit,
  getfarmVisits,
  getfarmVisit,
  deletefarmVisit,
};
