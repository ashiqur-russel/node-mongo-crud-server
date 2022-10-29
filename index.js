const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

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

    //Recieve data from client side
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
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
