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
         /* try{
           const user = req.user
           const userRef = await db.collection(config.collection.users).doc(user.uid);
           const input = {
             email: "",
             accessToken: token,
             provider: "nylas",
             user: userRef
           }

           const saveNylas = await db.collection("Nylas").add(input)
           return res.json({
            status: true,
            token,
            saveNylas
          });
         }
         catch(error){
          return res.json({
            status: false,
            message: "couldn't store token"
          });
         }
         */
         return res.json({
            status: true,
            token
          });
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