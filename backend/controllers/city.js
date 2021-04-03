const City = require("../models/city");

exports.getCityById = (req, res, next, id) => {
  City.findById(id).exec((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "City Not Found",
      });
    }
    req.city = city;

    next();
  });
};

exports.createCity = (req, res) => {
  const city = new City(req.body);
  city.save((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "City Not able to save",
      });
    }
    res.json({ city });
  });
};

exports.getCity = (req, res) => {
  console.log(req.city);
  return res.json(req.city);
};

exports.getAllCity = (req, res) => {
  City.find({}).exec((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "No City Found",
      });
    }
    res.json(city);
  });
};

exports.updateCity = (req, res) => {
  const city = req.city;
  city.name = req.body.name;

  city.save((err, updatedCity) => {
    if (err) {
      return res.status(400).json({
        error: "Error updating City ",
      });
    }
    res.json(updatedCity);
  });
};
exports.deleteCity = (req, res) => {
  const category = req.city;
  category.remove((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "Error deleting City ",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};
