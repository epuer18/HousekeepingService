import { MongoClient } from "mongodb";
import bcrypt from "bcrypt"; // to like hash the passwords

function MyDB() {
  const uri =
    "mongodb+srv://vickidiaz42:Szvc24woHj3TPKbW@cluster0.eyuhcto.mongodb.net/?retryWrites=true&w=majority";
  const myDB = {};

  //const prompts = [1, 2, 3, 4];

  const connect = () => {
    const client = new MongoClient(uri);
    console.log("client");
    // comback change
    const db = client.db("HousekeepingApp");

    return { client, db };
  };

  // class example
  myDB.getPrompts = async ({ query = {}, MaxElements = 20 } = {}) => {
    const { client, db } = connect();

    //const promptsCollection = db.collection("prompts");

    try {
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      //return await promptsCollection.find(query).limit(MaxElements).toArray();
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
      await client.connect();
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

  // asynchronous method called authenticateUser
  // expectes username and password
  myDB.authenticateUser = async ({ username, password }) => {
    const { client, db } = connect();
    try {
      await client.connect();
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

  return myDB;
}

export const myDB = MyDB();
