const express = require('express');
const hbs = require('hbs'); //handlebars template engine
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs'); //pass this function key value pair;

app.use((request,response,next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log(err);
    }
  });
  next();
});

/*
app.use((request,response,next) => {
  var maintenanceMessage = "Sorry, maintenance!";
  response.render('maintenance.hbs', {
    pageTitle: 'Maintenance',
    maintenanceMessage: maintenanceMessage
  })
})
*/


//pass two arguments to registerHelper: name and function
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(textToScream) => {
  return textToScream.toUpperCase();
})

app.get('/', (request, response) => {
  //res.send('<h1>hello express!</h1>');
  response.render('home.hbs',{
    pageTitle: 'Homepage',
    welcomeMessage: 'Howdy!',
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About page injected',
  });
});

function contact(request, response) {
  response.send('Contact page');
}

app.get('/bad', (request, response) => {
  response.send({
    error: "didn't wor",
    why: "who knows"
  });
});

const listeningPort=3000;

app.listen(listeningPort, () => {
  console.log(`Server listening on port ${listeningPort}`);
});
