const Nylas = require("../config/nylas.config").NylasServices

  exports.connect = () =>
  async function (req, res, next) {
   options = {
      redirectURI: 'http://localhost:3000/oauth/callback',
      scopes: ['email.read_only', 'email.send'],
    };
    res.redirect(Nylas.urlForAuthentication(options));
  
  }

  exports.me = () => async function (req, res, next) {
    const nylas = Nylas.with('OtjrpwBbWlCH0bu4DNqPurlh2o1s7i');
    nylas.account.get().then(account =>{
      return res.json({
        status: true,
        me: account
      });
    }).catch((error)=> {
      return res.json({
        status: false,
        message: "error:" + error,
      });
    });
  }

  exports.callback = () =>
  async function (req, res, next) {
   if (req.query.code) {
      Nylas.exchangeCodeForToken(req.query.code).then(token => {
         console.log(token);
         return res.json({
            status: true,
            token
          });
        // save the token to the current session, save it to the user model, etc.
      }).catch((error)=> {
         return res.json({
             status: false,
             message: "Authentication error:" + error,
           });
       });
    } else if (req.query.error) {
      return res.json({
         status: false,
         message: req.query.error,
       });
    }
  }