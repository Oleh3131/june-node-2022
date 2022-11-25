const {Schema,model} = require('mongoose');

const clubSchema = new Schema(
    {
        clubName: {type:String,required:true,default:''},
        email: {type:String,required:true,trim:true,lowercase:true,unique:true},
        yearOfFoundation:{type:Number,default: 1800}
    },
    {
        timestamps:true
    });


module.exports = model('Club', clubSchema);