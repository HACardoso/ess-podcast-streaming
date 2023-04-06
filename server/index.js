const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

require('./favorites')(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/search', (req, res) => {
  const query = req.query.q;
  if (query) {
      console.log(req.query.q);
      const results = db.getAllMatchingNames(query);
      res.json(results);
  } else {
      const allRecords = db.getAll();
      res.json(allRecords);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})