const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

//Create Express
const app = express();
app.use(cors()); 
app.use(express.json()); 

const uri = "mongodb+srv://dbAdmin:DBADMIN@smart-table-cluster.g9706.mongodb.net/?retryWrites=true&w=majority&appName=Smart-Table-Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/api/profiles', async (req, res) => {
  try {
    const db = client.db("Database");
    const profilesCollection = db.collection('profiles');
    const profiles = await profilesCollection.find().toArray(); 
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/api/profiles', async (req, res) => {
    try {
      const db = client.db("Database");
      const profilesCollection = db.collection('profiles');
      const newProfile = req.body;
      const result = await profilesCollection.insertOne(newProfile);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add profile' });
    }
  });
  
  app.put('/api/profiles/:id', async (req, res) => {
    try {
      const db = client.db("Database");
      const profilesCollection = db.collection('profiles');
      const { id } = req.params;
      const updatedProfile = req.body;
      const result = await profilesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedProfile }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });

  app.delete('/api/profiles/:id', async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ID format:", id);
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    try {
      const db = client.db("Database");
      const profilesCollection = db.collection('profiles'); 
      const result = await profilesCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        console.log("Profile successfully deleted with ID:", id);
        res.status(200).json({ message: 'Profile successfully deleted' });
      } 
    } catch (error) {
      console.error('Error deleting profile:', error); 
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  });
  
  