import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // to like hash the passwords

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

    console.log("Established Connection");
    const db = client.db("HousekeepingApp");

    return { client, db };
  };

  // define a get Services function for this module
  myDB.getServices = async ({
    query = {},
    MaxElements = 20,
    orderBy = "_id",
  } = {}) => {
    const { client, db } = connect();

    const servicesCollection = db.collection("services");
    try {
      return await servicesCollection
        .find(query)
        .limit(MaxElements)
        .sort({ orderBy: -1 })
        .toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // define an add service function to add a single service
  // to be used in the post page
  // myDB.addService = async (service) => {
  //   const { client, db } = connect();

  //   const servicesCollection = db.collection("services");
  //   try {
  //     return await servicesCollection.insertOne(service);
  //   } finally {
  //     console.log("db closing connection");
  //     client.close();
  //   }
  // };
  myDB.addService = async (service) => {
    const { client, db } = connect();
    const servicesCollection = db.collection("services");
    try {
      const result = await servicesCollection.insertOne(service);
      return result.insertedId; // return the ID of the inserted document
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateRating = async (userRating) => {
    const { client, db } = connect();

    const servicesCollection = db.collection("services");
    try {
      return await servicesCollection.updateOne(
        { _id: new ObjectId(userRating._id) },
        { $set: { rating: userRating.rating, n: userRating.n } }
      );
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  //  method called registerUser on the myDB object.
  myDB.registerUser = async ({ username, email, password }) => {
    // calls the connect function
    const { client, db } = connect();
    try {
      // This connects to the MongoDB database.
      // how to do this: https://www.npmjs.com/package/bcrypt
      // Generate salt & hash password
      // Using the bcrypt library, a new "salt" is generated.
      // A salt is random data that is used as an additional input to a hashing function.
      // The number 10 here refers to the number of rounds to use when generating the salt,
      // which affects the complexity and security of the salt.
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert user into database
      await db
        // users section in mongodb
        .collection("users")
        .insertOne({ username, email, password: hashedPassword });

      return { success: true };
    } catch (error) {
      console.error("Error during user operation:", error);
      return { success: false, error };
    } finally {
      client.close();
    }
  };

  // asynchronous method authenticateUser
  // expectes username and password
  // use to authenticateUser
  myDB.authenticateUser = async ({ username, password }) => {
    const { client, db } = connect();
    try {
      // searches the "users" collection in the database for a document (or user)
      // with the provided username. If found, the user document is stored in the user constant.
      const user = await db.collection("users").findOne({ username });
      // If user exists, it then uses bcrypt's compare function to check if the provided
      // password matches the hashed password stored in the database for that user.
      if (user && (await bcrypt.compare(password, user.password))) {
        return { success: true, user };
      }
      return { success: false, error: "Invalid credentials" };
    } catch (error) {
      console.error("Error authenticating user:", error);
      return { success: false, error };
    } finally {
      client.close();
    }
  };

  // asynchronous method deleteService
  // user to delete service in posting and booking pages and data base

  myDB.deleteService = async (serviceId) => {
    const { client, db } = connect();

    const servicesCollection = db.collection("services");
    try {
      const result = await servicesCollection.deleteOne({
        _id: new ObjectId(serviceId),
      });
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
