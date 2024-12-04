const Laptop = require("../models/Laptop");

exports.addLaptop = async (req, res) => {
  try {
    const laptop = await Laptop.create(req.body);
    res.status(201).json(laptop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLaptop = async (req, res) => {
  try {
    const laptop = await Laptop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(laptop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLaptop = async (req, res) => {
  try {
    await Laptop.findByIdAndDelete(req.params.id);
    res.json({ message: "Laptop deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

