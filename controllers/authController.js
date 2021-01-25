const User = require('../models/User');

module.exports.authRedirect = async (req,res)=>{
  // console.log(req.user)
  let userInfo = req.user;

  let user = new User({
      name: userInfo.displayName,
      email: userInfo._json.email
  })

  await user.save((err, result) => {
    if (err) {
      if (err.code === 11000) {
        req.session.user = userInfo;
        res.send("logged in");
      } else {
        res.send(err);
      }
    } else {
        req.session.user = userInfo;
        res.send('logged in');
    }
  });
}

module.exports.logout = (req,res)=>{
  req.session.destroy()
  res.redirect('/')
}