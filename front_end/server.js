var express = require('express');
var app = express();
var router = require('./router/main')(app);
var bodyParser = require('body-parser');

var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'cds',
  multipleStatements: true,
   dateStrings: true
});
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var sql='SELECT * FROM post' ;
var sql1 = 'SELECT * FROM post where type=1';
var sql2 = 'SELECT * FROM post where type=2';
var sql3 = 'SELECT * FROM post where type=3';

var db_nodes1 = new Array();
var db_nodes2 = new Array();
var db_nodes3 = new Array();
var db1;
var db2;
var db3;
conn.query(sql, function(err, rows, fields){
  if(err){
    console.log(err);
  } else {
    for(var i=0; i<rows.length; i++){
      console.log(rows[i]);
    }
  }
});

  app.get('/read',function(req,res){

        res.render('read.html');
     });
 app.get('/board',function(req, res){

        var page = req.query['page'];
        var kind = req.query['kind'];
        conn.query(sql, function(err, rows, fields){
          if(err){
            console.log(err);
          } else {
            for(var i=0; i < rows.length; i++){
              if(rows[i].type =='1'){
                db_nodes1.push(rows[i]);
              }
              else if (rows[i].type == '2') {
                db_nodes2.push(rows[i]); 
              }else {
                db_nodes3.push(rows[i]);
              }
            }
          } 
          
          console.log(page);
          console.log(kind);
          res.render('board.ejs',{
              'db1': db_nodes1,
              'db2':db_nodes2,
              'db3':db_nodes3, 
              'dbLength': rows.length,
              'page': page,
              'kind': kind
            });
    }); 
    });
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000");
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());