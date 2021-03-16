const express = require('express')
const nylasRoutes = require("./routes/nylas")
const authRoutes = require("./routes/auth")
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.use(express.json());
  app.use("/", nylasRoutes);
  app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})