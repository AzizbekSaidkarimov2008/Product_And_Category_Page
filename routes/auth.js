const { Router } = require("express");
const router = Router();
const fileUpload = require("../middleware/fileUpload");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
  });
});

router.get("/logout", (req, res, next) => {
  // req.session.isAuth = false
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const {login, password} = req.body

    const candidate = await Admin.findOne({login})
    console.log(candidate);

    if(candidate){
      const areSame = await bcrypt.compare(password, candidate.password)

      if(areSame){
        // const admin = await Admin.findById("618d57798ba369f5be58fa9f");
        req.session.isAuth = true;
        req.session.admin = candidate;
        // console.log(req.session.isAuth);
        res.redirect("/admin");
      }else{
        res.redirect('/auth/login')
      }
      
    }else{
      res.redirect('/auth/login')
    }
    
  } catch (error) {
    console.log(error);
  }


});

router.get("/register", (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
  });
});

router.post("/register", fileUpload.single("avatar"), async (req, res) => {
  const { login, name, password } = req.body;
  req.file ? (avatar = req.file.filename) : (avatar = "");

  const hasPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    login,
    name,
    password: hasPassword,
    avatar,
  });

  await admin.save();
  res.redirect("/auth/login");
});

module.exports = router;
