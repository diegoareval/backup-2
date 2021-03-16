const Nylas = require("./config/nylas.config").NylasServices
const nylas = Nylas.with("jZU3BA526Rq6oC8FGb6D2zIKZJn6XL")

function sendEmail(nylas){
  const draft = nylas.drafts.build({
    subject: "hi my friend",
     body: "hello bro",
     to: [{name: "My nylas test", email: "diego2000avelar@gmail.com"}]
  })
  
  draft.send().then((message)=> {
    console.log(message);
  }).catch((error)=> {
    console.log(error);
  })
}

function getThreads(nylas){
  nylas.threads
    .count({in:'inbox'})
    .then(count => {
        console.log(`There are ${count} threads in your inbox.`);
    });
}
function getThreadList(nylas){
  nylas.threads.list({}).then(threads => {
    console.log(threads);
  });
}

function getNylasAccount(nylas){
  // Return all accounts connected to your Nylas App.
Nylas.accounts.list().then(accounts => {
  for (let account of accounts) {
    console.log(
      `Email: ${account.emailAddress} | `,
      `Billing State: ${account.billingState} | `,
      `Sync State: ${account.syncState}`,
      `ID: ${account.id}  | `
    );
  }
});
}

function getMostRecentMessage(nylas){
  nylas.messages.first({in: 'inbox'}).then(message =>{
    console.log(message.subject);
    // Log the Nylas global ID for the message
    console.log(message.id);
    // Log the service provider ID of the message
    console.log(message.unread);
});
}

function filtermostRecentMessage(nylas, filter= {limit: 10}){
  nylas.threads.list(filter).then(threads =>{
    for (let thread of threads) {
        console.log(thread.subject);
        console.log(thread.participants);
    }
});
}

function searchMessage(nylas, param="from:kezzsim@hotmail.com"){
  nylas.messages.search(param).then(messages => {
    for (let message of messages) {
        console.log(message.subject);
    }  
});
}

function multipleCalendars(nylas){
  nylas.calendars.list().then(calendars => {
    for (let calendar of calendars) {
        // Print the name of each calendar, it's ID, and whether or not the calendar is read only
        console.log(`Name: ${calendar.name} | Description: ${calendar.description} | ID: ${calendar.id} | Read Only: ${calendar.readOnly}`);
    }
});
}

async function getEvents(nylas){
  // Return the 5 oldest events from a specified calendar and print their titles to the console.
  const calendar = await nylas.calendars.first()
  console.log(calendar);
  if(!calendar){
    console.log("no existe");
    return;
  }
nylas.events.list({calendar_id: calendar.id, limit: 10 }).then(events => {
  for (let event of events) {
      console.log(
          `Title: ${event.title} | `,
          `Description: ${event.description} | `,
          `When: ${event.when} | `,
          `Participants: ${event.participants}`,
      );
  }
});
}

function createEvent(nylas){
  const event = nylas.events.build({
    title: 'New Years Party!',
    // calendarID must be the ID for a calendar the user has write access to.
    calendarId: "vuyerasdx1nztknaarzuxc6n",
    // Event times are set via UTC timestamps
    // This example creates an event on December 31, 2018
    when: { start_time: 1546290000, end_time: 1546300800 },

    // Participants are stored as an array of participant subobjects
    participants: [{ email: 'swag@nylas.com', name: 'My Nylas Friend' }],
    location: 'My House!'
  });

// Event notification emails are not sent by default
// Enable notify_participants to send an email notification to participants
event.save({ notify_participants: true }).then(event => {
    console.log(event);
});
}

function getContacts(nylas){
  // Print the first and last name, email address, and the ID of the first 10 contacts returned for the user's account
nylas.contacts.list({limit: 10}).then(contacts => {
  for (const contact of contacts) {
      console.log(`Name: ${contact.givenName} ${contact.surname} | Email: ${contact.emailAddresses.email} | ID: ${contact.id}`);
  }
}).catch((error)=> {
  console.log(error);
})
}

function createContact(nylas){
  const contact = nylas.contacts.build({
    // The contact's given name is typically their first name, 
    // you can specify a last name with 'surname'
    given_name: "My Nylas Friend",
    notes: "Make sure to keep in touch!",

    // Email address 'type' must be either 'work' or 'personal'
    emails: [{type: 'work', email: 'diego2000avelar@gmail.com'}],

    // Phone number type must be one of 'business', 'organization_main', 
    // 'mobile', 'assistant', 'business_fax', 'home_fax', 'radio', 'car', 'home', or 'pager'
    // Google labels 'business' phone numbers as the contact's Work phone number
    phone_numbers: [{type: 'random', number: '50376540104'}],

    // Web page type must be one of 'homepage', 'profile', 'work', or 'blog'
    web_pages: [{type: 'homepage', url: 'https://nylas.com'}]
});

contact.save().then( contact => {
    console.log(contact);
}).catch((error)=> {
  console.log(error);
});
}

function getIpAddress(){
  // useless trial account
  Nylas.accounts.first()
  .then(account => account.ipAddresses())
  .then(response => console.log(response)).catch((e)=> {
    console.log(e);
  });
}
// getIpAddress()
//createContact(nylas)
//getContacts(nylas)
createEvent(nylas)
//getEvents(nylas)
//multipleCalendars(nylas)
//searchMessage(nylas)
//filtermostRecentMessage(nylas, {unread: true, limit: 5})
// getMostRecentMessage(nylas)
// getNylasAccount(nylas)
//getThreads(nylas);
// getThreadList(nylas)
 //sendEmail(nylas);