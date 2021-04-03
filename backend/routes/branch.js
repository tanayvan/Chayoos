const express = require("express");
const router = express.Router();

const {
  getBranchById,
  createBranch,
  getAllBranch,
  getBranch,
  updateBranchCity,
  updateBranchName,
  deleteBranch,
} = require("../controllers/branch");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("branchId", getBranchById);

//actual routes goes here
router.post(
  "/branch/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createBranch
);

//Read Route
router.get("/branch/:branchId", getBranch);
router.get("/branches", getAllBranch);

//update
router.put(
  "/branch/:branchId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateBranchCity
);
router.put(
  "/branch/:branchId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateBranchName
);

//delete
router.delete(
  "/branch/:branchId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteBranch
);

module.exports = router;
