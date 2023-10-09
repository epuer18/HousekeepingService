import { MongoClient } from "mongodb";

function MyDB() {
  const uri = "mongodb+srv://puertae:<password>@cluster0.u0h8npt.mongodb.net/?retryWrites=true&w=majority";
  const myDB = {};

  const prompts = [1, 2, 3, 4];

  const connect = () => {
    const client = new MongoClient(uri);
    console.log("client")
    const db = client.db("HousekeepingApp");

    return { client, db };
  };

  myDB.getPrompts = async ({ query = {}, MaxElements = 20 } = {}) => {
    const { client, db } = connect();

    //const promptsCollection = db.collection("prompts");

    try {
      await client.connect();
    // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      //return await promptsCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
