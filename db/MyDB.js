import { MongoClient } from "mongodb";

function MyDB() {
  const uri = "mongodb+srv://puertae:<Shy4NQzvmA7OL2Vq>@cluster0.u0h8npt.mongodb.net/?retryWrites=true&w=majority";
  const myDB = {};

  const prompts = [1, 2, 3, 4];

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("promptsStorer");

    return { client, db };
  };

  myDB.getPrompts = async ({ query = {}, MaxElements = 20 } = {}) => {
    const { client, db } = connect();

    const promptsCollection = db.collection("prompts");

    try {
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return await promptsCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
