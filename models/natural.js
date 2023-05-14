const express = require('express');
const multer = require('multer');
const _ = require('lodash');
const natural = require('natural');
const fs = require('fs');
const app = express();

const upload = multer({dest: 'uploads/'});

function extractTags(text) {
    const words = text.split(' ');
    const frequency = _.countBy(words);
    const rankedWords = _.chain(frequency)
        .map((count, word) => ({word, count}))
        .orderBy(['count'], ['desc'])
        .value();
    const tags = rankedWords.slice(0, 5).map(({word}) => word);
    return tags;
}

app.post('/', upload.single('textfile'), (req, res) => {
    const filePath = req.file.path;
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const tags = extractTags(fileContents);
    res.send(`
     <form action="/" method="post" enctype="multipart/form-data">
        <input type="file" name="textfile">
        <input type="text" name="fileContents" value="${fileContents}">
        <input type="text" name="tags" value="${tags.join(', ')}">
        <button type="submit">Upload</button>
      </form>
  `);
    const extractedTags = extractTags(fileContents);
    console.log(extractedTags);
    res.send('File uploaded successfully.');
});

app.get('/', (req, res) => {
    res.send(`
    <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="textfile">
      <button type="submit">Upload</button>
    </form>
  `);
});

// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// });






