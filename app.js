const express = require('express');
const morgan = require('morgan');

const AppsData = require('./AppsData');

const app = express();

app.use(morgan('common')); 

app.get('/apps', (req, res) => {
// accepts query params of sort or genres
// sort can be rating or app
// genres can be Action, Puzzle, Strategy, Casual, Arcade, Card
  const {sort, genres = ""} = req.query;
  const genresArr = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
  let results = AppsData;

  if(sort && !['rating', 'app'].includes(sort)){
      return res.status(400).send('Sort must be one of rating or app');
  }

  if(sort){

  }

  if(genres){
      results = results.filter(app => app.Genres.toLowerCase === genrees.toLowerCase);
  }

  res.json(results)
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });  