const authRouter=require('./auth')

module.exports=(app)=>{
// routes group -> auth
    app.use('/auth',authRouter)
}