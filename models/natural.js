const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

const upload = multer({dest: 'uploads/'}); //we're telling Multer to store the uploaded file in a directory called uploads/.
app.get('/', (req, res) => {
    res.send(`
 
    <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="textfile">
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/', upload.single('textfile'), (req, res) => {
    const filePath = req.file.path;
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    console.log(fileContents);
    res.send('File uploaded successfully.');
});

app.listen(5000, () => console.log('Server started on port 5000.'));