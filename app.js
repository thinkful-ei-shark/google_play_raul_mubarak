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

  if(!genres){
      return res.status(400).send('Genre is required as search parameter')
  }

  if(genres && !genresArr.includes(genres.toLowerCase())){
    return res.status(400)
      .send('Genre must be of type Action, Puzzle, Strategy, Casual, Arcade, or Card');
  }

  if(genres){
    results = results.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));
  }
  
  if(sort && !['rating', 'app'].includes(sort.toLowerCase())){
      return res.status(400).send('Sort must be one of rating or app');
  }

  if(sort){
    let temp = sort.toLowerCase();
    temp = sort.charAt(0).toUpperCase() + temp.slice(1);
    
    results.sort((a, b) => {
      if(temp !== 'Rating'){
        a = a[temp].toLowerCase();
        b = b[temp].toLowerCase();
      } else {
        a = a[temp];
        b = b[temp];
      }
      
      if(a < b){
        return -1;
      } else if(a > b){
        return 1;
      } else {
        return 0;
      }
    })
  }

  res.json(results)
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });  