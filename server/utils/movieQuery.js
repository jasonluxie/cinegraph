const router = require('express').Router();
const path = require('path');
const axios = require('axios')
const omdbapi = process.env.OMDB_API_KEY
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

const movieData = {
  movieQuery: async (query) => {
    // console.log(query)
    const fixedQuery = query.split(" ").join("+")
    return await axios({
      method: 'get',
      url: `http://www.omdbapi.com/?apikey=${omdbapi}&t&t=${fixedQuery}`,
    })
  }
}

const tryAgain = {
  movieQueryAgain: async (query, queryYear) => {
    console.log(query, queryYear)
    const fixedQuery = query.split(" ").join("+")
      return await axios({
        method: 'get',
        url: `http://www.omdbapi.com/?apikey=${omdbapi}&t&t=${fixedQuery}&y=${queryYear}`,
      })
  }
}

module.exports = { movieData, tryAgain };


