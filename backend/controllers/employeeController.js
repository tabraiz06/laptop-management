const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const Assignment = require("../models/Assignment");
exports.addEmployee = async (req, res) => {
  const { name, email, password, department } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      department,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if the employee has any laptop assignments
    const assignments = await Assignment.find({ employeeId: id });
    if (assignments.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete employee with assigned laptops" });
    }

    // Delete the employee
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    console.error("Error removing employee:", error);
    res.status(500).json({ message: "Failed to remove employee" });
  }
};
