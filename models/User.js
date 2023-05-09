const {dbConnection} = require('../conf')
const {userValidator} = require('../validators')

class User {
    constructor(userData) {
        this.userData = userData;
    }

    save() {
        dbConnection('users', async (collection) => {
            await collection.insertOne(this.userData)
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
                        if (this.userData.email === user.email) {
                            resolve({
                                check: true,
                                message: 'This email is already used'
                            })
                        } else if (this.userData.username === user.username) {
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
        const validation = userValidator.validate(userData);
        return validation;
    }
}

const user = new User({
    name: 'salam',
    email: 'salam@gmail.com',
    username: 'salam',
    password: '11111aaaaa'
})

// const mongoose = require('mongoose');
// const userSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     passsword: String,
//     dateOfBirth: Date
// })
//
// // mongoose.set("strictQuery", false)
// // mongoose.connect("mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority")
// //     .then(() => {
// //         console.log("connected to mongodb")
// //     }).catch((err) => {
// //     console.log(err)
// // })
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//     name: String,
//     email: String,
//     passsword: String,
//     dateOfBirth: Date
// });
// const User = mongoose.model('User', userSchema);

User.validate(user.userData)
user.save()
user.isExist()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err)
    })


module.exports = User;