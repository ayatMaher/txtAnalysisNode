const {MongoClient} = require('mongodb')

const _uri = "mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority"

const dbConnection = (collection, cb) => {
    MongoClient.connect(_uri)
        .then(async (client) => {
            const db = client.db('TextAnalysis').collection(collection);
            await cb(db)
            client.close();
        })
        .catch();
}
// const { MongoClient } = require('mongodb')
//
// const _uri = "mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority"
//
// const dbConnection = (collection, cb) => {
//     MongoClient.connect(_uri)
//         .then(async (client) => {
//             const db = client.db('TextAnalysis').collection(collection);
//             await cb(db)
//             client.close();
//         })
//         .catch();
// }
// const mongoose = require('mongoose')
//
// mongoose.set("strictQuery", false)
// const dbConnection = (collection,cb)=>{
//     mongoose
//         .connect("mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority")
//         .then(async (client)=> {
//             const db = client.db('TextAnalysis').collection(collection);
//             await cb(db)
//             client.close();
//             console.log('connected mongodb')
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// }


// const {MongoClient} = require('mongodb')
// const mongoose = require('mongoose');
// const uri = "mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority"
// const dbConnection = (collection, cb) => {
//     mongoose.connect(uri)
//         .then(async (client) => {
//             console.log("connected to mongodb")
//             const db = client.db('TextAnalysis').collection(collection);
//             // work رح يجي من عملية اي من controller فبده callback
//             await cb(db)
//             client.close();
//         })
//         .catch();
// }
// // dbConnection('users',async (db)=>{
// //     const u1=await db.findOne();
// //     console.log(u1)
// // })
module.exports = dbConnection
//
// //const mongoose = require('mongoose');
// //
// // mongoose.set("strictQuery", false)
// // mongoose.connect("mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority")
// //     .then(() => {
// //         console.log("connected to mongodb")
// //     }).catch((err) => {
// //     console.log(err)
// // })
