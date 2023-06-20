const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const{User} = require('../models')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  },
  Mutations: {
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
    saveBook: async (parent,{user,body},context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: body } },
            { new: true, runValidators: true }
          );

         return updatedUser 
      }
      throw new AuthenticationError('You need to be logged in!')  
    },
    removeBook: async ( parent , {params},context) =>{
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
              );
        } throw new AuthenticationError('you need to be logged in!')
    }
    
  }


}

module.exports = resolvers