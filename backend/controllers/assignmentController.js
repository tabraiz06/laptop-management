const Assignment = require("../models/Assignment");
const Laptop = require("../models/Laptop");

exports.assignLaptop = async (req, res) => {
  try {
    const { laptopId, employeeId } = req.body;
    //check if already assign to someone
    const assigned = await Assignment.findOne({ laptopId });
    
    if(assigned){
     return res.status(400).json({message:"already assigned to someone"})
    }


    // Update laptop status to "assigned"
    await Laptop.findByIdAndUpdate(laptopId, { status: "assigned" });

    const assignment = await Assignment.create({ laptopId, employeeId });
    
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      employeeId: req.user,
    }).populate("laptopId employeeId");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("laptopId employeeId");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unassignLaptop = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ error: "Assignment not found" });

    // Update laptop status to "available"
    await Laptop.findByIdAndUpdate(assignment.laptopId, {
      status: "available",
    });

    await Assignment.findByIdAndDelete(id);
    res.json({ message: "Laptop unassigned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
