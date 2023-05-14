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

module.exports = dbConnection

