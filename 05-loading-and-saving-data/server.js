var express    = require('express')
  , app        = module.exports = express.createServer()
  ;

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));  //static stuff
  app.use(express.static(__dirname + '/../libs')); //js files
});

app.get('/tasks', function (_,response) {
  response.send(
    [ { "title": "Wire the money to Panama", "isDone": true }
    , { "title": "Get hair dye, beard trimmer, dark glasses and \"passport\"", "isDone": false}
    , { "title": "Book taxi to airport", "isDone": false }
    , { "title": "Arrange for someone to look after the cat", "isDone": false }
    ]);
});


app.post('/tasks', function (request,response) {
  response.send(request.body); //echo
});

app.listen(process.argv[2]||8080);

process.on('uncaughtException', function(err) {
  console.log(JSON.stringify(err));
});

console.log('servers up!');