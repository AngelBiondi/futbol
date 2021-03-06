
const POSTT = require('./models/post.js')

module.exports = function(app, passport) {

    app.get('/newnote', (req,res,next) => {
      POSTT.find().then(news => {
          res.render('newnew.hbs', { news })
        })
      })
      
      
      app.post("/saveNewsToTheDatabase", (req,res,next) =>{
        console.log('did we make it????', req.body)
        Celebrity.create(req.body).then(result => {
          res.redirect('newnew')
        })
      
      })
      
                ///details/5cc9e9a3329be1f82a23c0da
      app.get('/details/:newID', (req,res,next)=>{
        Celebrity.findById(req.params.celebID).then(celeb=>{
          res.render("newsDetails.hbs", { celeb })
        })
      })
      
      
      app.get('/delete/:id', (req, res, next)=>{
        Celebrity.findByIdAndDelete(req.params.id).then(r=>{
          console.log(r)
          res.redirect('/newnew')
        }).catch(err => console.log(err) )
      })
      
      
      app.get('/edit/:id', (req, res,next) => {
        Celebrity.findById(req.params.id).then(celeb=>{
          res.render("edit.hbs", { celeb })
        })
      })
      //http://localhost:3000/edit/5cc9ee3d420635faac3fd7df
      app.post('/edit/:id', (req, res,next) => {
        Celebrity.findByIdAndUpdate(req.params.id, req.body).then(ifItWOrKs=>{
          res.redirect(`/details/${req.params.id}`)
        })
      })

}

