const User = require("../models");
const createError = require('http-errors')

const signUp = (req, res, next) => {
    const userData = req.body;

    // validation
    const validation = User.validate(userData)
    if (validation.error) {
        const error = createError(400, validation.error.message)
        next(error)
    }
    // check existance
    const user = new User(userData);
    user.isExist()
        .then(result => {
            if (result.check) {
                next(createError(409, result.message))
            }
        })
        .catch(err => {
            next(createError(500, err.message))
        })
}
// // pass handler
// const bcrypt = require('bcrypt')
// const signUp = async (req, res, next) => {
//     let {name, email, password, dateOfBirth} = req.body;
//     name = name.trim();
//     email = email.trim();
//     password = password.trim();
//     dateOfBirth = dateOfBirth.trim();
//     res.send("Welcome");
//     if (name === "" || email === "" || password === "" || dateOfBirth === "") {
//         res.json({
//             status: 400,
//             message: "Empty input Field!"
//         });
//     } else if (!/^[a-zA]*$/.test(name)) {
//         res.json({
//             status: 400,
//             message: "Invalid name entered"
//         });
//     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//         res.json({
//             status: 400,
//             message: "Invalid email entered"
//         });
//     } else if (!new Date(dateOfBirth).getTime()) {
//         res.json({
//             status: 400,
//             message: "Invalid date of birth entered"
//         });
//     } else if (password.length < 8) {
//         res.json({
//             status: 400,
//             message: "Password is too short!"
//         });
//     } else {
//         // checking if user already exists
//         User.find({email}).then(result => {
//             if (result.length) {
//                 // userer already exists
//                 res.json({
//                     status: 400,
//                     message: "User with the provided email already exists"
//                 })
//             } else {
//                 // try to create new user
//                 //pass handling
//                 try {
//                     dbConnection('User',()=>{
//
//                     })
//                     const user =  User.create(req.body)
//                     res.status(200).json(user)
//                 }catch (err){
//                     res.status(500).json({message: err.message})
//                 }
//             }
//         }).catch(err => {
//             console.log(err);
//             res.json({
//                 status: 400,
//                 message: "An error occurred while checking for existing user!"
//             })
//         })
//     }
// }
module.exports = {
    signUp
}