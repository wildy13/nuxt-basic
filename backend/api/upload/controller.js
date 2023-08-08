const Upload = require('./model')
const extract  = require('extract-zip')

const uploadFile = async (req, res) => {
  try {
    console.log(req.file)
    const targetPath = `../frontend/static/file/zip/${req.file.originalname}`
    const unpackPath = '../frontend/static/file/unzip'
    const resolve = require('path').resolve
    
    var resolvedUnpackPath = resolve(unpackPath);
    
    extract(targetPath, {
      dir: resolvedUnpackPath
    });
    const usersId = req.params.id
    const zipPath = targetPath
    const  unZipPath = resolvedUnpackPath
    const name = req.file.originalname

    const upload = new Upload ({
      zipPath,
      unZipPath,
      name,
      usersId

    })

    const save = await upload.save()
    res.status(200).json(save)
  } catch (error) {
    console.log(error)
  }
  };
  
  module.exports = { uploadFile };