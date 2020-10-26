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

    var query = { year: selectedYear, runtime: {$gt: selectedMinRunTime}}

    await client.db().query.limit(10);

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

main().catch(console.error);
