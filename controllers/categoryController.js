const Category = require('../models/category');

module.exports = {

    // -> Function To Create Category
    createCategory: async (req,res) => {
      var newCategory = new Category(req.body);
      try {
       await newCategory.save();
       res.status(201).json({status: true, message: "Category Created Successfully"});

      } catch (error) {
        res.status(500).json({status: false, message: error.message});
      }
    },

    // -> Function To Get All Categories
    getAllCategories: async (req,res) => {
        try {
            const categories = await Category.find({title: {$ne: "More"}}, {__v: 0});
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }
    },
};