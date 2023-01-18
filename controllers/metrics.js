import User from '../models/user';

export const bonkLeaderBoard = async (req, res) => {
    const users = await User.find({}).sort({bonkPoints: -1}).limit(10).exec();
    return res.send(users);
};

export const solLeaderBoard = async (req, res) => {
    const users = await User.find({}).sort({solPoints: -1}).limit(10).exec();
    return res.send(users);
};