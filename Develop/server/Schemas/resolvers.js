const User = require('../models/User');
const { signToken } = require('../utils/auth');
module.exports = {
    Query: {
        me: async (parents, args, config, info) => {
            const user = await User.findOne({ args });
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
        saveBook: async (parents, { book }, config, info) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: book.userId },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
              );
            return updatedUser;
        },
        removeBook: async (parents, { bookId, _id }, config, info) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: _id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
            return updatedUser;
        }
    }
}