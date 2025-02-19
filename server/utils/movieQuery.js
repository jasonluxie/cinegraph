const router = require('express').Router();
const path = require('path');
const axios = require('axios')
require('dotenv').config()
const omdbapi = process.env.OMDB_API_KEY
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

const movieData = {
  movieQuery: async (query) => {
    const fixedQuery = query.split(" ").join("+")
    return await axios({
      method: 'get',
      url: `http://www.omdbapi.com/?apikey=${omdbapi}&t=${fixedQuery}`,
    })
  }
}

const tryAgain = {
  movieQueryAgain: async (query, queryYear) => {
    console.log(query, queryYear)
    const fixedQuery = query.split(" ").join("+")
      return await axios({
        method: 'get',
        url: `http://www.omdbapi.com/?apikey=${omdbapi}&t=${fixedQuery}&y=${queryYear}`,
      })
  }
}

module.exports = { movieData, tryAgain };


