var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Eleve= require('./models/eleve.js');
var app = express();

//connexion db
var promise=mongoose.connect('mongodb://localhost:27017/ifa',{
    useMongoClient:true,
});

//quand la connexion est réussie
promise.then(function(db){
    console.log('db.connected');
    app.listen(3000, function() {
        console.log('listening on 3000 and database is connected');
    });

});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('views','./views');
app.set('view engine','jade');
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use('/img',express.static('./client/img'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/liste.html');
});

app.get('/profil', function (req,res){
    res.sendFile(__dirname + '/client/profil.html');
});


app.post('/quotes', function(req, res) {
    console.log(req.body);
    console.log("my name is " + req.body.nom);
    var newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom
    };
    liste.push(newUser);
    // liste.push(t);
    res.send(200);

});

app.get('/api/liste', function(req, res) {
    Eleve.find({},function(err, collection){
        if(err){
            console.log(err);
            return res.send(500);
        }
        else {
            
            res.send(collection);
        }
    });
});

// sans moteur de rendu
app.get('/api/liste/:id', function(req, res) {
    Eleve.findOne({"_id": req.params.id}, function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }
        else {
            return res.send(objet);
        }
    });
});


app.post('/ajout',function(req,res){
    //console.log(req.body);
    var newUser= new Eleve(req.body);
    newUser.save(function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }else {
            res.redirect('/');
        }
    });
});


app.post('/modify',function(req,res){
   
   console.log(req.body);
   var modifyUser=req.body;
    Eleve.findByIdAndUpdate({"_id":modifyUser['_id']}, modifyUser,{multi:false}, function(err, objet){
        if(err){
            console.log(err);
            return res.send(500);
        }else{
            res.redirect('/');
        }
    });
});


app.post('/del', function(req,res){
    //console.log(req.params.id);
    Eleve.findByIdAndRemove({"_id": req.body['_id']}, function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }else{
            res.redirect('/');
        }
    });
});


//avec jade
app.get('/api/liste/jade/:id', function(req, res) {
    Eleve.findOne({"_id": req.params.id}, function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }
        else {
            return res.render('profil',{
                title:'hey',
                nom: objet.nom,
                prenom: objet.prenom
            });
        }
    });
});