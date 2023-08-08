const fs = require('fs')
const path = require('path');
const Category = require('./model')

const getCategory = async (req, res) => {
    try {
        const cateogory = await Category.findAll({
            attributes: ['name', 'path', 'usersId', 'createdAt', 'updatedAt']
        });
        res.status(200).json(cateogory)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createCategory = async (req,res) => {
    const folderName = `../frontend/static/${req.body.name}`;
    const resolve = require('path').resolve
    
    var resolvedUnpackPath = resolve(folderName);

    try {
      if (!fs.existsSync(resolvedUnpackPath)) {
        fs.mkdirSync(resolvedUnpackPath);
      }
      const name = req.body.name
      const path = resolvedUnpackPath
      const usersId = req.body.id
      const category = new Category ({
        usersId,
        name,
        path
  
      })
      const save = await category.save()
      res.status(200).json(save)
    } catch (err) {
      console.error(err);
    }
}

module.exports = { getCategory, createCategory}