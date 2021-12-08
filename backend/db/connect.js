const mongoose=require('mongoose')

const db = process.env.DB

const connect=()=>{mongoose.connect(db).then(() => {
    console.log('connected to DB')
  })
  .catch((err) => {
    console.log(err)
  })
}
  module.exports=connect