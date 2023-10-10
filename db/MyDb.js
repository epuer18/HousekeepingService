import { MongoClient } from "mongodb";

// Make a module for our database
function MyDB() {

  // connect to MongoDB  
  const uri = "mongodb+srv://puertae:abcd@cluster0.u0h8npt.mongodb.net/?retryWrites=true&w=majority";
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(uri);
    console.log("client")
    const db = client.db("HousekeepingApp");

    return { client, db };
  };


  myDB.getServices = async ({ query = {}, MaxElements = 20, orderBy = "rating" } = {}) => {
    const { client, db } = connect();

    const servicesCollection = db.collection("services");
    try {
      await client.connect();
      return await servicesCollection.find(query).limit(MaxElements).sort({orderBy: -1}).toArray();

    } finally {
      console.log("db closing connection");
      client.close();
    }
  };


  return myDB;
}

export const myDB = MyDB();
