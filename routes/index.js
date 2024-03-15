var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});
router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    // to get values at backend
    secret: req.body.secret,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
// router.get("/create", async function (req, res) {
//   let userData = await userModel.create({
//     username: "Khusi",
//     nickname: "ss",
//     description: "A girl of my days",
//     categories: ["8", "fashion", "react", "gsap"],
//   });
//   res.send(userData);
// });
// router.get("/find", async function (req, res) {
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         { $gte: [{ $strLenCP: "$username" }, 0] },
//         { $lte: [{ $strLenCP: "$username" }, 5] },
//       ],
//     },
//   });
//   res.send(user);
// });
// router.get("/find", async function (req, res) {
//   let user = await userModel.find({ categories: { $exists: true } });
//   res.send(user);
// });
// router.get("/find", async function (req, res) {
//   var date1 = new Date("2024-03-14");
//   var date2 = new Date("2024-03-15");
//   let user = await userModel.findOne({
//     datecreated: { $gte: date1, $lte: date2 },
//   });
//   res.send(user);
// });
// router.get("/find", async function (req, res) {
//   // var regexp = new RegExp("Saurabh", "i"); //it give all the users which contains saurabh
//   var regexp = new RegExp("^Saurabh$", "i");
//   let user = await userModel.find({ categories: { $all: ["fashion"] } });
//   res.send(user);
// });
// `  router.get("/find", async function (req, res) {
//   // var regexp = new RegExp("Saurabh", "i"); //it give all the users which contains saurabh
//   var regexp = new RegExp("^Saurabh$", "i");
//   let user = await userModel.findOne({
//     username: regexp,
//   });
//   res.send(user);
// });
// router.get("/failed", function (req, res) {
//   req.flash("age", 21);
//   req.flash("name", "Saurabh");
//   res.send("banagya");
// });

// router.get("/checkkaro", function (req, res) {
//   console.log(req.flash("age"), req.flash("name"));
//   res.send("check kar lo back-end like terminal ");
// });

module.exports = router;
