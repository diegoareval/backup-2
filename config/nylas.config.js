
const Nylas = require("nylas")

Nylas.config({
    clientId: "",
    clientSecret: "",
  });

  exports.NylasServices = Nylas
exports.nylas = Nylas.with("")