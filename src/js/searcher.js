// var rs = require('readline-sync');
//
// var yearInput = rs.question('Input year: ');
// var minRunTimeInput = rs.question('Input minRunTime: ');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function runQuery(selectedYear, selectedMinRunTime){
//async function runQuery(){
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
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
}


//
// async function main() {
//
//   const MongoClient = require('mongodb').MongoClient;
//   un = "admin"
//   password = "@dm!nP@33w0rd"
//   const uri = "mongodb+srv://" + un + ":" + password + "@cluster0.ntby6.mongodb.net/sample_mflix?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true });
//
//   try {
//
//     await client.connect();
//
//     await listDatabases(client);
//
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
//

  // client.connect(err => {
  // //  const collection = client.db("test").collection("devices")
  //   //Cluster0
  //
  //   await listDatabases(client);
  //
  //
  //   // perform actions on the collection object
  //   client.close();
  // });

}

//runQuery(1993, 45).catch(console.error);
