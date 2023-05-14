const {dbConnection} = require('../conf')
const {userValidator, loginValidator} = require('../validators')
const {hashSync, compareSync} = require('bcryptjs') // hash (non-blocking) (async) , hashSync (blocking)(sync)

class User {
    constructor(userData) {
        this.userData = userData;
    }

    save(cb) {
        dbConnection('users', async (collection) => {
            try {
                const hashedPassword = hashSync(this.userData.password)
                this.userData.password = hashedPassword
                await collection.insertOne(this.userData)
                    .then(result => {
                        cb({
                            status: true,
                            message: result.message
                            // _user_id: result.insertedId
                        })
                    })
            } catch (err) {
                cb({
                    status: false,
                    message: err.message
                })
            }
        })
    }


    isExist() {
        return new Promise((resolve, reject) => {
            try {
                dbConnection('users', async (collection) => {
                    const user = await collection.findOne({
                        '$or': [
                            {username: this.userData.username},
                            {email: this.userData.email}
                        ]
                    })

                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else {
                        if (user.email === this.userData.email) {
                            resolve({
                                check: true,
                                message: 'This email is already used'
                            })
                        } else if (user.username === this.userData.username) {
                            resolve({
                                check: true,
                                message: 'this username is already used'
                            })
                        }
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    }


    static validate(userData) {
        try {
            return userValidator.validate(userData);
        } catch (err) {
            return false;
        }

    }

    static logIn(logInData) {
        return new Promise((resolve, reject) => {
            // validation
            const validation = loginValidator.validate(logInData)
            if (validation.error) {
                const error = new Error(validation.error.message)
                error.statusCode = 400
                resolve(error)
            }
            // find user
            dbConnection('users', async (collection) => {
                try {
                    const user = await collection.findOne(
                        {username: logInData.username},
                        {projection: {username: 1}}
                    )
                    if (!user || !compareSync(logInData.password, user.password)) {
                        const error = new Error('Wrong or not found username or password')
                        error.statusCode = 401
                        resolve(error)
                    }
                    resolve(user)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}

module.exports = User;
