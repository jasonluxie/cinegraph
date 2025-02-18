const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Movies, User } = require('../models')
const { movieData,tryAgain } = require('../utils/movieQuery')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('savedMovies');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedMovies');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedMovies');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    movieData: async (parent, args) => {
      const data = await movieData.movieQuery(args.query);
      const movieInfo = data.data
      movieInfo.Rating = data.data.Ratings[1].Value

      return movieInfo
    },
    tryAgain: async (parent, args) => {
      const data = await tryAgain.movieQueryAgain(args.query, args.queryYear);
      const movieInfoAgain = data.data
      movieInfoAgain.Rating = data.data.Ratings[1].Value
      return movieInfoAgain
    },
    savedMovies: async () => {
      const data = await Movies.find()
      return data
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveOmdbMovie: async (parent, args) => {
      const data = await movieData.movieQuery();
      const movieInfo = {}
      movieInfo.Title = data.data.Title
      movieInfo.Rating = data.data.Ratings[1].Value
      movieInfo.BoxOffice = data.data.BoxOffice
      movieInfo.Year = data.data.Year
      movieInfo.imdbID = data.data.imdbID
      Movies.create(movieInfo)
    },

    saveMovie: async (parent, args) => {
      console.log("savemovie",args)
      const savedMovie = await Movies.create(args);
      console.log(savedMovie)
      return savedMovie;
    },
    removeMovie: async (parent, { imdbID }, context) => {
        return Movies.findOneAndDelete(
          { imdbID: imdbID },
        );
      
    }
  }
}


module.exports = resolvers;
