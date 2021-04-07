const Branch = require("../models/branch");

exports.getBranchById = (req, res, next, id) => {
  Branch.findById(id)
    .populate("city")
    .exec((err, branch) => {
      if (err) {
        return res.status(400).json({
          error: "Branch Not Found",
        });
      }
      req.branch = branch;

      next();
    });
};

exports.createBranch = (req, res) => {
  const branch = new Branch(req.body);
  branch.save((err, branch) => {
    if (err) {
      return res.status(400).json({
        error: "Branch Not able to save",
      });
    }
    res.json({ branch });
  });
};

exports.getBranch = (req, res) => {
  console.log(req.branch);
  return res.json(req.branch);
};

exports.getAllBranch = (req, res) => {
  Branch.find({})
    .populate("city")
    .exec((err, branch) => {
      if (err) {
        return res.status(400).json({
          error: "No Branch Found",
        });
      }
      res.json(branch);
    });
};

exports.updateBranchName = (req, res) => {
  const branch = req.branch;
  branch.name = req.body.name;

  branch.save((err, updatedBranch) => {
    if (err) {
      return res.status(400).json({
        error: "Error updating Branch ",
      });
    }
    res.json(updatedBranch);
  });
};
exports.updateBranchCity = (req, res) => {
  const branch = req.branch;
  branch.city = req.body.city;

  branch.save((err, updatedBranch) => {
    if (err) {
      return res.status(400).json({
        error: "Error updating Branch ",
      });
    }
    res.json(updatedBranch);
  });
};
exports.deleteBranch = (req, res) => {
  const branch = req.branch;
  branch.remove((err, branch) => {
    if (err) {
      return res.status(400).json({
        error: "Error deleting Branch ",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};

exports.reserveATable = (req, res) => {
  const branch = req.branch;
  branch.reserved_table.push(req.body.table_no);
  branch.save((err, updatedBranch) => {
    if (err) {
      return res.status(400).json({
        error: "Error updating Branch ",
      });
    }
    res.json(updatedBranch);
  });
};
exports.unReserveATable = (req, res) => {
  const branch = req.branch;
  Branch.findByIdAndUpdate(branch._id, {
    $pull: { reserved_table: req.body.table_no },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Error updating tables ",
      });
    });
};
