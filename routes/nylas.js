const router = require("express").Router();
const controller = require("../controllers/nylas.controller")

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.post('/send-email', controller.sendEmail()
);

router.get('/threads', controller.getThreadList()
);

router.get('/contacts', controller.getContacts()
);

router.get('/events', controller.getEvents()
);

router.get('/calendars', controller.getCalendars()
);

router.get('/messages', controller.searchMessages()
);

router.get('/last-message', controller.lastMessage()
);

router.get('/search-messages/:query', controller.searchMessagesbyParams()
);

router.post('/create-contact', controller.createContact()
);

module.exports = router;