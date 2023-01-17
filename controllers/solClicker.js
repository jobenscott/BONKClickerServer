import User from "../models/user";


const starting_reward = .00001;
const starting_cost = .0001;

export const solManualClick = async (req, res) => {
    const address = req.query.address;
    // get their user object
    const user = await User.findOne({ address: address }).exec();
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        // console.log(user);
        // if (user) {
        //     res.send(user);
        // } else {
        //     res.send(address);
        // }

        // grab `clickPower` which is an integer on the user object
        const solClickPower = user.solClickPower;

        // // grab `solLastClicked`, which is a timestamp field on the user object, to verify this is only being called once per second
        const solLastClicked = user.solLastClicked;

        // // grab `solAutoClicker` and `solAutoClickerMultiplier` to calculate the total number of clicks per second
        const solAutoClicker = user.solAutoClicker;
        const solAutoClickerMultiplier = user.solAutoClickerMultiplier;

        // // if `solLastClicked` is less than 1 second ago, return an err;xf;xfor
        if (solLastClicked) {
            if (Date.now() - solLastClicked < 1000) {
                return res.status(400).send("Please wait before clicking again.");
            }
        }

        // // otherwise, update `solLastClicked` to the current time
        user.solLastClicked = Date.now();
        let auto_amount = (0.0000000001 * ((Date.parse(user.solLastClicked) - Date.parse(solLastClicked)) * (solAutoClicker * (solAutoClickerMultiplier * 0.05))))
        // // and update `solPoints`, which is an integer field on the user object, by taking the intial value and adding (1 * `clickPower`) to it
        console.log(auto_amount);
        if(user.solPoints < 0) {
            user.solPoints = 0;
        }
        if (user.solAutoClicker > 0) {
            user.solPoints += ((starting_reward * (1 + (solClickPower * 0.05))) + auto_amount);
        } else {
            // var milliSeconds = Date.parse();
            user.solPoints += ((starting_reward * (1 + (solClickPower * 0.05))));
        }


        // // save the user object
        await user.save();
        // console.log(test);

        user.password = undefined;

        // return user object
        return res.send(user);

        // return the new value of `solPoints` to the client, or user object
        // return res.send({solPoints: user.solPoints});
        // return res.send(user);
    } catch (err) {
        user.password = undefined;

        // return user object
        return res.send(user);
    }
};

export const solPurchaseAutoClicker = async (req, res) => {
    let solAutoClickerCost = starting_cost;
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        const address = req.query.address;
        // get their user object
        const user = await User.findOne({ address: address }).exec();


        // calculate the cost of the solAutoClicker
        if (user.solAutoClicker > 0) {
            solAutoClickerCost = solAutoClickerCost * (1 + (user.solAutoClicker * 1.7));
        }
        if (user.solPoints > solAutoClickerCost) {

            // update `solAutoClickerCount` by 1, which is an integer field on the user objct
            user.solAutoClicker++;
            
            user.solPoints -= solAutoClickerCost;

            // save the user object
            await user.save();

            user.password = undefined;

            // return user object
            return res.send(user);
        } else {
            return res.status(400).send("Not enough BONK!");
        }

    } catch (err) {
        return res.status(500).send(err);
    }
};

export const solPurchaseAutoClickerMultiplier = async (req, res) => {
    let solAutoClickerMultiplierCost = starting_cost;
    const address = req.query.address;
    // get their user object
    const user = await User.findOne({address: address}).exec();
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
       

        // calculate the cost of the solAutoClicker
        solAutoClickerMultiplierCost = solAutoClickerMultiplierCost * (1 + (user.solAutoClickerMultiplier * 1.5));

        if (user.solPoints > solAutoClickerMultiplierCost) {
            // update `solAutoClickerMultiplierCount` by 1, which is an integer field on the user objct
            user.solAutoClickerMultiplier++;
            // if(user.solPoints - solAutoClickerMultiplierCost > 0) {
            user.solPoints -= solAutoClickerMultiplierCost;
            // } else {
                // user.solPoints
            // }

            // save the user object
            await user.save();

            user.password = undefined;

            // return user object
            return res.send(user);
        } else {
            user.password = undefined;
            return res.send(user);
        }

    } catch (err) {
        user.password = undefined;
        return res.send(user);
    }
};

export const solPurchaseClickPower = async (req, res) => {
    let solClickPowerCost = starting_cost;
    const address = req.query.address;
    // get their user object
    const user = await User.findOne({address: address}).exec();
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
       

        // calculate the cost of the solAutoClicker
        solClickPowerCost = solClickPowerCost * (1 + (user.clickPower * 2));

        if (user.solPoints > solClickPowerCost) {

            // update `clickPower` by 1, which is an integer field on the user objct
            user.solClickPower++;

            user.solPoints -= solClickPowerCost;


            // save the user object
            await user.save();

            user.password = undefined;

            // return user object
            return res.send(user);
        } else {
            user.password = undefined;
            return res.send(user);
        }

    } catch (err) {
        return res.status(500).send(err);
    }
};
