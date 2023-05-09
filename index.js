const http = require('http')
const app = require('./app')

const server = http.createServer(app)

server.listen(5000, () => {
    console.log('Server is listening now')
})

// mongoose.set("strictQuery", false)
// mongoose
//     .connect("mongodb+srv://asalman:hcb5FIYlqCYmpudb@cluster0.xfnfuqe.mongodb.net/TextAnalysis?retryWrites=true&w=majority")
//     .then(() => {
//         app.listen(5000, () => {
//             console.log("node run on port 5000")
//         })
//         console.log('connected mongodb')
//     })
//     .catch((err) => {
//         console.log(err)
//     })