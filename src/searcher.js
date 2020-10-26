//var button = document.getElementById('onlyButton');
//button.addEventListener('click', runQueryPreset);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function runQuery(selectedYear, selectedMinRunTime){
  const MongoClient = require('mongodb').MongoClient;
  un = "admin"
  password = "@dm!nP@33w0rd"
  const uri = "mongodb+srv://" + un + ":" + password + "@cluster0.ntby6.mongodb.net/sample_mflix?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {

    await client.connect();

    await listDatabases(client);

    var query = { year: selectedYear, runtime: {$gt: selectedMinRunTime}};

    await client.db("sample_mflix").collection("movies").find(query).limit(5).toArray(function(err, result){
    console.log(result);
    document.getElementById("searchContainer").innerHTML = result;
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
}

async function runQueryPreset(){
//async function runQuery(){
  const MongoClient = require('mongodb').MongoClient;
  un = "admin"
  password = "@dm!nP@33w0rd"
  const uri = "mongodb+srv://" + un + ":" + password + "@cluster0.ntby6.mongodb.net/sample_mflix?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {

    await client.connect();

    await listDatabases(client);

    var query = { year: 1993 };

    await client.db("sample_mflix").collection("movies").find(query).limit(5).toArray(function(err, result){
    console.log(result);
    document.getElementById("searchContainer").innerHTML = result;
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
runQueryPreset().catch(console.error);

module.exports = {runQuery: func};
//runQuery(1993, 45).catch(console.error);
