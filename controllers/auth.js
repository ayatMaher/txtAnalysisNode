const {User} = require("../models");
const createError = require('http-errors')

const signUp = (req, res, next) => {
    // res.render('signUp')
    const userData = req.body;

    // validation
    const validation = User.validate(userData)
    if (validation.error) {
        const error = createError(400, validation.error.message)
        // console.log("ayat", error)
        next(error)
    }
    // check existence
    const user = new User(userData);
    user.isExist()
        .then(result => {
            if (result.check) {
                const error = createError(409, result.message)
                console.log("ex", result.check);
                return next(error)
            }
        })
        .catch(err => {
            const error = createError(500, err.message)
            console.log("exc", error);
            return next(error)
        })
    // save (insert user)
    user.save((status) => {
        if (status.status) {
            // const _user_id = status._user_id
            res.status(201).json({
                status: true,
                message: "User has been created successfully"
            })
        } else {
            const error = createError(500, status.message)
            console.log("ayat1" + error)
            return next(error)
        }
    });

}
const logIn = (req, res, next) => {
    res.render('logIn')
    User.logIn(req.body)
        .then(result => {
            if (result instanceof Error) {
                const error = createError(result.statusCode, result.message) // 401
                return next(error)
            }
            res.status(200).json({
                message: "Log In"
            })
        })
        .catch(err => {
            const error = createError(err.statusCode, err.message)
            return next(error)
        })
}
module.exports = {
    signUp, logIn
}