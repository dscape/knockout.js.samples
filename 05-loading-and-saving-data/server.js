var express    = require('express')
  , app        = module.exports = express.createServer()
  ;

app.configure(function(){
  express.logger();
  app.use(express.static(__dirname + '/static'));
});

app.get('/tasks', function (_,response) {
  response.send( { "expensecat": "meow", "version": config.api.version } );
});

app.post('/tasks', function (request,response) {
  email.get(request.params.email_id, render(response));
});

app.listen(process.argv[2]);

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});

console.log('servers up!');