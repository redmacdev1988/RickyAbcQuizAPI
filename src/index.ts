import { MongoClient } from 'mongodb';

const express = require('express');
const body = require('body-parser');

async function start() {
  try {

    const app = express();

    const mongo = await MongoClient.connect("mongodb+srv://caolaoshi:qiechengzhang@penguinenglish.mialf.mongodb.net/?retryWrites=true&w=majority");

    await mongo.connect();

    app.db = mongo.db();

    // body parser

    app.use(body.json({
      limit: '500kb'
    }));

    // Routes

      // Start server
      app.use('/', (req, res) => {
        // res.status(200).json({
        //   message: `Welcome to RickyABC Quiz API`,
        //   url1: `/users <-- see the users, `,
        //   url2: `/createQuiz <-- create quizzes for specific user`,
        // });


        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(`<h1>Welcome to RickyABC Quiz API</h1><ul><li>/users - see all valid users</li><li>/createQuiz - create quiz for specific user</li></ul>`));

        
      })

    app.use('/customers', require('./routes/customers'));

  
    app.listen(3000, () => {
      let dateTime = new Date()
      console.log('Server is running on port 3000', dateTime.toDateString());
    });

  }
  catch(error) {
    console.log(error);
  }
}

start();