import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Make a module for database
function MyDB() {
  // Add to set .env configurations, namely the MongoDB uri
  dotenv.config();

  // connect to MongoDB  
  const uri = process.env.MONGO_URL;
  const myDB = {};

  // Create a brief connection
  const connect = () => {
    const client = new MongoClient(uri);

    console.log("Established Connection")
    const db = client.db("HousekeepingApp");

    return { client, db };
  };

  // define a get Services function for this module
  myDB.getServices = async ({ query = {}, MaxElements = 20, orderBy = "rating" } = {}) => {
    const { client, db } = connect();

    const servicesCollection = db.collection("services");
    try {
      return await servicesCollection.find(query).limit(MaxElements).sort({orderBy: -1}).toArray();

    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // define an add service function to add a single service
  // to be used in the post page
  myDB.addService = async (service) => {
    const { client, db } = connect();

    const servicesCollection = db.collection("services");
    try {
      console.log(service);
      return await servicesCollection.insertOne(service);

    } finally {
      console.log("db closing connection");
      client.close();
    }
  }
  return myDB;
}

export const myDB = MyDB();
