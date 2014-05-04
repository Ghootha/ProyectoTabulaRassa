/*
Una prueba usando cliente de mongoDB para node.js
loriacarlos@gmail.com 2014
Referencias
http://nodejs.org/api/modules.html#modules_modules
https://nodejsmodules.org/pkg/mongodb
http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
http://mongodb.github.io/node-mongodb-native/api-generated/collection.html
http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
http://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html
*/
var mongoDriver = require('mongodb');
var MongoClient = mongoDriver.MongoClient;
var ObjectID    = mongoDriver.ObjectID;
var dbName = "futbol";
var server = "localhost";
var mongoPort = "27017";
var connectionString = "mongodb://"+server+":"+mongoPort+"/"+dbName;
var collectionName = "campeonatos";///////////////////////////////////

var connectToDB = function(mainObj, h){
  console.log("connectToDB starts:");
  try{
     mainObj.client.connect(connectionString, function(err, db){
	 console.log("connectToDB connect results (error and object):"+err+ " "+db);
	 if(!err && db) mainObj._obj.db = db;
	 else mainObj.error=err;
	 if(h) h()
	 else mainObj.db_done(); 
	});
  } catch(e){
    throw e;
  };
};
var findAllTeams = function(mainObj, h){
  console.log("findAllTeams start:");
  try{
    mainObj._obj.db.collection(collectionName, function(err, collection) {
	   console.log("findAllTeams find results (error and object):"+err+ " "+collection);
	  if(!err) mainObj._obj.teams = collection;
	  else mainObj.error = err;
	  if(h) h();
	  else mainObj.collect_done();
	});
  } catch(e){
    throw e;
  }
};
function updateTeam(mainObj, criteriaObject, updateObject, handler){
  console.log("updateTeam db start:");
  try{
     mainObj._obj.teams.update(criteriaObject, 
	                      //{$set:updateObject}, 
						  updateObject,
						  function(e, r){handler(e,r)});
  } catch(e){
     throw(e);
  };
};
function MainTeamsObject(){
   this.client = MongoClient;
   this.error  = null;
   this._obj   = {    db:null,    // objeto de conexion a la db (teams)
                      teams:null, // objeto de acceso a la coleccion (allteams)
                      array:[],	  // array con toda la coleccion forzada
                      collectionName:collectionName				  
			     };
   this.errorHandler = function(e){
				   throw(e); // callback: la idea es que el cliente la asigne
   };
   this.done = function(){
				     // callback: la idea es setearla desde afuera
   };
};
MainTeamsObject.prototype.ObjectID = function(str){ // Para crear IDs de mongo
				           console.log("method objectid before:" +str);
				           var obj = new ObjectID(str);
						   console.log("method objectid after:" +" "+ obj+ " "+ obj.str);
						   return obj;
};
MainTeamsObject.prototype.getTeams = function(){
				   return this._obj.array;
};
MainTeamsObject.prototype.db_done = function(){
				   //console.log("Db done ");
				   if(this.error){
				     this.errorHandler();
				     return;
				   };
				   this.collection();
};
MainTeamsObject.prototype.collect_done = function(){
				   //console.log("Collection done ");
				   if(this.error){
				     this.errorHandler();
				     return;
				   };
				   this.asArray();
};
MainTeamsObject.prototype.db = function(h){ //Crea la conexión sino existe
				   console.log("db method:"+ this._obj.db);
				   if(!this._obj.db)
				     connectToDB(this, h);
				   else if(h) h();
				   else this.done();
				    
};
MainTeamsObject.prototype.collection = function(h){
				  console.log("collection method:"+ this._obj.teams);
				  if(!this._obj.teams)
				    findAllTeams(this, h);
				  else if(h) h();
};

MainTeamsObject.prototype.update = function(c, u, h){
				    console.log("update method:"+JSON.stringify(c)+" "+JSON.stringify(u));
				    var me = this;
				    this.db(function(){
					         me.collection(
							   function(){updateTeam(me, c, u, h);})}); 
};

MainTeamsObject.prototype.asArray = function(){ // Consulta todos y los fuerza en un array
				    var me = this;
				    if(this._obj.teams){
					    this._obj.teams.find().toArray(function(err, array){
					    if(err) throw err;
						me._obj.array = array;
						//console.log("As array Done");
						me.done();
					    });
					};
};

// Exporta el mainObject
module.exports = new MainTeamsObject();
