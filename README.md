# flash is used to create a data in one route and use it in another rout

router.get("/", function (req, res) {
res.render("index");
});
router.get("/failed", function (req, res) {
req.flash("age", 21);
req.flash("name", "Saurabh");
res.send("banagya");
});

router.get("/checkkaro", function (req, res) {
console.log(req.flash("age"), req.flash("name"));
res.send("check kar lo be like terminal ");
});

# intermediate mongodb

mongoose ko setup karo

Questions->
Q1. How can I perform a case-insensitive search in Mongoose?

we have to use
router.get("/find", async function (req, res) {
// var regexp = new RegExp("Saurabh", "i"); //it give all the users which contains saurabh
var regexp = new RegExp("^Saurabh$", "i");
let user = await userModel.findOne({
username: regexp,
});
res.send(user);
});

Q2. how do I find documents where an array field contains all ofa set of values ?
router.get("/find", async function (req, res) {
// var regexp = new RegExp("Saurabh", "i"); //it give all the users which contains saurabh
var regexp = new RegExp("^Saurabh$", "i");
let user = await userModel.find({ categories: { $all: ["fashion"] } });
res.send(user);
});

Q3.How can I search for document with a specific date range in Mongoose?
router.get("/find", async function (req, res) {
var date1 = new Date("2024-03-14");
var date2 = new Date("2024-03-15");
let user = await userModel.findOne({
datecreated: { $gte: date1, $lte: date2 },
});
res.send(user);
});

Q4. How can I filter document based on the existence of a field in Mongoose?router.get("/find", async function (req, res) {
let user = await userModel.find({ categories: { $exists: true } });
res.send(user);
});

Q5.How can I filter document based on a specific field's length in Mongoose?
router.get("/find", async function (req, res) {
let user = await userModel.find({
$expr: {
      $and: [
        { $gte: [{ $strLenCP: "$username" }, 0] },
{ $lte: [{ $strLenCP: "$username" }, 20] },
],
},
});
res.send(user);
});

# Authentication and authorization

install these packages -
--- npm i passport passport-local passport-local-mongoose mongoose express-session

write app.js code first in app.js file and write it after view engine and before logger

setup user.js the properly

in index.js try register first and then other codes as well
