var bcrypt = require('bcrypt');


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function addUser(password) {
  console.log("MAKING PASSWORD")
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);

  console.log(bcrypt.hashSync(password, salt));
}

async function main() {

  const MongoClient = require('mongodb').MongoClient;
  un = "admin"
  password = "@dm!nP@33w0rd"
  const uri = "mongodb+srv://" + un + ":" + password + "@cluster0.ntby6.mongodb.net/sample_mflix?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {

    await client.connect();


    //await listDatabases(client);

    await addUser("st@t3_of_I0w@");


  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

main().catch(console.error);
