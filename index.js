const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

//Middleeare
app.use(cors());
app.use(express.json());

//Database connection

//dbUser100652

const uri =
  "mongodb+srv://dbUser2:dbUser100652@cluster0.irpitar.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");
    //Retrieve data from database
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //Recieve data from client side
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      console.log(result);

      res.send(result);
    });
    //Delete user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    //Retrived user with particular id

    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await userCollection.findOne(query);
      console.log(user);
      res.send(user);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));
//route
app.get("/", (req, res) => {
  res.send("Hello from Node Mongo Crud Server");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
