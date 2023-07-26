const express = require("express");
const { getAllUsers, createUser, getUserById, updateUser, deleteUser  } = require("../controllers/user");
const { createThought, getAllThoughts, getThoughtsById, updateThoughts, deleteThought } = require("../controllers/thought");
const { addFriendsLists, deleteFriendsList } = require("../controllers/friends");
const { addReactions, deleteReactions } = require("../controllers/reaction");

const router = express.Router();

//users
router.get("/users", getAllUsers); //get all users

router.get("/users/:id", getUserById); //get all users

router.post("/users", createUser); //create a new user

router.put("/users/:id", updateUser); //update a user

router.delete("/users/:id", deleteUser); //delete a user

//thoughts
router.post("/thoughts",createThought); //create thought

router.get("/thoughts",getAllThoughts); //create thought

router.get("/thoughts/:id",getThoughtsById); //create thought

router.put("/thoughts/:id",updateThoughts); //create thought

router.delete("/thoughts/:id",deleteThought); //create thought

//friends
router.post("/users/:userId/friends/:friendId", addFriendsLists);

router.delete("/users/:userId/friends/:friendId", deleteFriendsList);

//reactions
router.post("/thoughts/:thoughtId/reactions", addReactions);

router.delete("/thoughts/:thoughtId/reactions/:deleteReaction", deleteReactions);

module.exports = router;
