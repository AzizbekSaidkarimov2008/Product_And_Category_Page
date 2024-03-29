const { Router } = require("express");
const router = Router();
const Category = require("../models/Category");
const fileUpload = require("../middleware/fileUpload");
const Product = require("../models/Product");
const toDelete = require('../middleware/toDelete')
const auth = require('../middleware/auth')

router.get("/view", auth ,async (req, res) => {
  const products = await Product.find()
  res.render("admin/products", {
    header: "Mahsulotlarni ko`rish",
    title: "Mahsulotlar",
    layout: "main",
    products
  });
});

router.get("/add", auth ,async (req, res) => {
  const categories = await Product.find();
  res.render("admin/productCreate", {
    header: "Mahsulot Yaratish",
    layout: "main",
    categories,
  });
});

router.post("/add", auth ,fileUpload.single("img"), async (req, res) => {
  const { name, price, categoryId } = req.body;
  const img = req.file.filename;
  const product = new Product({ 
    name,
    price,
    img,
    categoryId,
  });
  await product.save(); 
  res.redirect("/admin/product/view");
});


// router.get("/edit:id", fileUpload.single("img"), async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.render("admin/productEdit", {
//     title: "Mahsulotlarni o`zgartirish",
//     header: "Mahsulotlarni o`zgartirish",
//     product,
//   });
// });

// router.post("/edit:id", fileUpload.single("img"), async (req, res) => {
//   const { img } = await Product.findById(req.params.id);
//   const product = req.body
  
//   if(req.file){
//     toDelete(img)
//     product.img = req.file.filename
//   }

//   await Product.findByIdAndUpdate(req.params.id, product, (err)=>{
//     if(err){
//       console.log(err);
//     }else{
//       res.redirect('/admin/product/view')
//     }
//   })
// });

module.exports = router;
