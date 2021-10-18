const User = require('../models/User');
const { signToken, getDataFromToke } = require('../utils/auth');
module.exports = {
    Query: {
        me: async (parents, { token }, config, info) => {
            const userData = getDataFromToke(token);
            const user = await User.findOne({
                $or: [{ _id: userData ? userData._id : null }, { username: userData.username }],
              });
            return user;
        },
    },
    Mutation : {
        login: async (parents, { user }, config, info) => {
            const foundUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] });
            const correctPw = await foundUser.isCorrectPassword(user.password);
            const token = signToken(foundUser);
            return { user: foundUser, token };
        },
        addUser: async (parents, { user }, config, info) => {
            const createdUser = await User.create(user);
            const token = signToken(createdUser);
            return { user: createdUser, token };
        },
        saveBook: async (parents, { book, token }, config, info) => {

            const userData = getDataFromToke(token);
            const updatedUser = await User.findOneAndUpdate(
                { _id: userData._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
              );
            return updatedUser;
        },
        removeBook: async (parents, { bookId, token }, config, info) => {
            
            const userData = getDataFromToke(token);
            const updatedUser = await User.findOneAndUpdate(
                { _id: userData._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
            return updatedUser;
        }
    }
}