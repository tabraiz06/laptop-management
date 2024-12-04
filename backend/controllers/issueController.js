const Issue = require("../models/Issue");
const Laptop = require("../models/Laptop");

exports.reportIssue = async (req, res) => {
  try {
    const { laptopId, description, priority, reportedBy } = req.body;
    console.log(req.body)
await Laptop.findByIdAndUpdate(laptopId, { status: "maintenance" });
    const issue = await Issue.create({
      laptopId,
      description,
      priority,
      reportedBy,
    });
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("laptopId");
    
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get a perticula laptop issue
exports.getLaptopIssue=async(req,res)=>{
try {
    const issues = await Issue.find({ laptopId:req.params.id });
    if (issues.length === 0) {
      return res
        .status(404)
        .json({ message: "No issues found for this laptop." });
    }
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching laptop issues:", error);
    res.status(500).json({ message: "Failed to fetch issues." });
  }
};


exports.updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const issue = await Issue.findByIdAndUpdate(id, { status }, { new: true });
    res.json(issue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
