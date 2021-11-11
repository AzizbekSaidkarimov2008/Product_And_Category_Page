const { Router } = require("express");
const router = Router();
const fileUpload = require("../middleware/fileUpload");
const Admin = require("../models/Admin");

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    header: "Login sahifasi",
  });
});

router.post('/login', async(req,res)=>{
    const admin = await Admin.findById('618d57798ba369f5be58fa9f')
    req.session.isAuth = true
    console.log(req.session.isAuth);
    res.redirect('/admin')
})

router.get("/register", (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
  }); 
});

router.post("/register", fileUpload.single("avatar"), async (req, res) => {
  const { login, name, password } = req.body;
  req.file ? avatar = req.file.filename : avatar = "";

  const admin = new Admin({
    login,
    name,
    password,
    avatar
  });

  await admin.save();
  res.redirect("/auth/login");
});

module.exports = router;
