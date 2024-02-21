const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailVarificationTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        expired: 3600,
        defaule: Date.now(),
    },
});
emailVarificationTokenSchema.pre('save', async function
(next){
    if (this.isModified("token")){
        this.token  = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model(
    "EmailVerificationToken",
    emailVarificationTokenSchema);
