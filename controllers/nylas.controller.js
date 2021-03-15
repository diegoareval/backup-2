const nylas = require("../config/nylas.config").nylas

  exports.sendEmail = () =>
  async function (req, res) {
      const {subject, body, name, email} = req.body

      if(subject.length<4 || body.length<10 || name.length<5 || email.length<4){
        return res.json({
            status: false,
            message: "Debes enviar los datos requeridos",
          });
      }
    
    const draft = nylas.drafts.build({
        subject,
         body,
         to: [{name, email}]
      })
      
      draft.send().then((message)=> {
        return res.json({
            status: true,
            message,
          });
      }).catch((error)=> {
        return res.json({
            status: false,
            message: "message couldn't send" + error,
          });
      })
  };

  exports.getThreadList = ()=> async function(req, res) {
    nylas.threads.list({}).then(threads => {
        return res.json({
            status: true,
            threads,
          });
      }).catch((error)=>{
        return res.json({
            status: false,
            message: " couldn't fetch threads" + error,
          });
      });
  }

  exports.getContacts = ()=> async function(req, res) {
    nylas.contacts.list({limit: 10}).then(contacts => {
        return res.json({
            status: true,
            contacts,
          });
      }).catch((error)=> {
        return res.json({
            status: false,
            message: " couldn't fetch contacts" + error,
          });
      })
  }

  exports.getCalendars = ()=> async function(req, res) {
    nylas.calendars.list().then(calendars => {
        return res.json({
            status: true,
            calendars,
          });
    }).catch((error)=> {
        return res.json({
            status: false,
            message: " couldn't fetch calendars" + error,
          });
      });
  }

  exports.getEvents = ()=> async function(req, res) {
  const calendar = await nylas.calendars.first()
  if(!calendar){
    return res.json({
        status: false,
        message: "calendar does not exist",
      });
  }
nylas.events.list({calendar_id: calendar.id, limit: 10 }).then(events => {
    return res.json({
        status: true,
        events,
      });
}).catch((error)=> {
    return res.json({
        status: false,
        message: " couldn't fetch events" + error,
      });
    })
}


  exports.createContact = ()=> async function(req, res) {
      const {given_name, notes, emails, phone_numbers, web_pages} = req.body
     console.log(given_name);
    const contact = nylas.contacts.build({
        given_name: given_name,
        notes,
        emails,
        phone_numbers,
        web_pages
    });
    
    contact.save().then( contact => {
        return res.json({
            status: true,
            contact,
          });
    }).catch((error)=> {
        return res.json({
            status: false,
            message: " couldn't create contacts" + error,
          });
    });
  }

  exports.searchMessages = ()=> async function(req, res) {
    nylas.threads.list({limit: 10}, ).then(threads =>{
        return res.json({
            status: true,
            threads,
          });
    }).catch((error)=> {
        return res.json({
            status: false,
            message: " couldn't fetch messages" + error,
          });
      });
  }

  exports.searchMessagesbyParams = ()=> async function(req, res) {
      const param = req.params.query
      console.log(param);
    nylas.messages.search(param).then(messages =>{
        return res.json({
            status: true,
            messages,
          });
    }).catch((error)=> {
        return res.json({
            status: false,
            message: " couldn't fetch messages" + error,
          });
      });
  }

  exports.lastMessage = ()=> async function(req, res) {
  nylas.messages.first({in: 'inbox'}).then(message =>{
      return res.json({
          status: true,
          message,
        });
  }).catch((error)=> {
      return res.json({
          status: false,
          message: " couldn't fetch message" + error,
        });
    });
}

