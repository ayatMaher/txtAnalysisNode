const express = require('express');
const {MongoClient} = require('mongodb');

const app = express();
const port = 3000;
const _uri = "mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority"
const dbName = 'TextAnalysis';

// app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;

    MongoClient.connect(_uri, (err, client) => {
        if (err) {
            console.log('Error connecting to MongoDB:', err);
            return;
        }

        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        usersCollection.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Error retrieving user data:', err);
                return;
            }

            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            res.render('profile', { user });
            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});