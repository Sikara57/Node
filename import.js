//import librairie
var mongoose=require('mongoose');
var Eleve=require('./models/eleve.js');
var srcListe=require('./data/liste.js');

//connexion db
var promise=mongoose.connect('mongodb://localhost:27017/ifa',{
    useMongoClient:true,
});

//quand la connexion est réussie
promise.then(function(db){
    console.log('db.connected');
    /*var test=new Eleve({"nom":'leo'}); // création nouvel eleve 
    test.save(function(err,eleve){  //save dns la base 
        if(err){
            return console.log(err);
        }
        else{
            console.log('eleve success');
            console.log(eleve);
        }
    })*/

    srcListe.forEach(function(eleveSrc){
        console.log(eleveSrc);

        var eleveToSave=new Eleve(eleveSrc);

        eleveToSave.save(function(err,success){
            if(err){
                return console.log(err);
            }
            else{
                console.log(success);
            }
        });
    })

});
//console.log(srcListe);