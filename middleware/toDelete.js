const fs = require('fs')
const path = require('path')

const filePath = path.join(require.main.filename)

module.exports = async (fileName)=>{
    await fs.unlink(filePath + '/../../public/images/' + fileName ,(err)=>{
        if(err){
            console.log(err);
        }
    })
}