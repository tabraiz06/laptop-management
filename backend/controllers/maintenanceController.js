const Maintenance = require("../models/Maintenance");
const Laptop = require("../models/Laptop");

exports.logMaintenance = async (req, res) => {
  try {
    const { laptopId, description, cost } = req.body;

    // Update laptop status to "maintenance"
    await Laptop.findByIdAndUpdate(laptopId, { status: "maintenance" });

    const maintenance = await Maintenance.create({
      laptopId,
      description,
      cost,
    });
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMaintenanceLogs = async (req, res) => {
  try {
    const logs = await Maintenance.find().populate("laptopId");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaintenanceLogs=async(req,res)=>{
  try {
    const { laptopId, description, cost , status} = req.body;
    const updateMaintenanceLogs = await Maintenance.findByIdAndUpdate(
      req.params.id,
      {laptopId,description,cost,status},
      {
        new: true,
      }
    ).populate("laptopId");
await Laptop.findByIdAndUpdate(laptopId, { status});

    res.status(200).json(updateMaintenanceLogs)
  } catch (error) {
     res.status(400).json({ error: error.message });
  }
}
