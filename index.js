const express = require('express')
const Nylas = require("nylas")
const nylasRoutes = require("./routes/nylas")
const app = express()
const port = 3000

Nylas.config({
    clientId: "2tfto6xg8h5kce6loz54d4bwx",
    clientSecret: "blzuh88vh7irnux5a3wyhn0zq"
})

const nylas = Nylas.with("jZU3BA526Rq6oC8FGb6D2zIKZJn6XL")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/connect', (req, res, next) => {
    options = {
      redirectURI: 'http://localhost:3000/oauth/callback',
      scopes: ['email.read_only', 'email.send'],
    };
    res.redirect(Nylas.urlForAuthentication(options));
  });

  app.get('/oauth/callback', (req, res, next) => {
    if (req.query.code) {
      Nylas.exchangeCodeForToken(req.query.code).then(token => {
        // save the token to the current session, save it to the user model, etc.
      });
    } else if (req.query.error) {
      res.render('error', {
        message: req.query.reason,
        error: {
          status:
            'Please try authenticating again or use a different email account.',
          stack: '',
        },
      });
    }
  });
  app.use(express.json());
  app.use("/", nylasRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})