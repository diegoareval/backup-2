const express = require('express')
const Nylas = require("nylas")
const nylasRoutes = require("./routes/nylas")
const authRoutes = require("./routes/auth")
const app = express()
const port = 3000

Nylas.config({
    clientId: "edo3hsarhesck99vgagc5inyz",
    clientSecret: "2p1in3betzullfygxn2lthj8p"
})

// const nylas = Nylas.with("jZU3BA526Rq6oC8FGb6D2zIKZJn6XL")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.use(express.json());
  app.use("/", nylasRoutes);
  app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})