import User from "../models/user";

export const manualClick = async (req, res) => {
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        const address = req.query.address;
        // get their user object
        const user = await User.findOne({ address: address }).exec();
        // console.log(user);
        // if (user) {
        //     res.send(user);
        // } else {
        //     res.send(address);
        // }

        // grab `clickPower` which is an integer on the user object
        const clickPower = user.clickPower;

        // // grab `lastClicked`, which is a timestamp field on the user object, to verify this is only being called once per second
        const lastClicked = user.lastClicked;

        // // grab `autoClicker` and `autoClickerMultiplier` to calculate the total number of clicks per second
        const autoClicker = user.autoClicker;
        const autoClickerMultiplier = user.autoClickerMultiplier;

        // // if `lastClicked` is less than 1 second ago, return an error
        if (lastClicked) {
            if (Date.now() - lastClicked < 1000) {
                return res.status(400).send("Please wait before clicking again.");
            }
        }

        // // otherwise, update `lastClicked` to the current time
        user.lastClicked = Date.now();
        let auto_amount = (0.00000001 * ((Date.parse(user.lastClicked) - Date.parse(lastClicked)) * (autoClicker * (autoClickerMultiplier * 0.05))))
        // // and update `bonkPoints`, which is an integer field on the user object, by taking the intial value and adding (1 * `clickPower`) to it
        console.log(auto_amount);
        if (user.autoClicker > 0) {
            user.bonkPoints += ((.001 * (1 + (clickPower * 0.05))) + auto_amount);
        } else {
            // var milliSeconds = Date.parse();
            user.bonkPoints += ((.001 * (1 + (clickPower * 0.05))));
        }


        // // save the user object
        await user.save();
        // console.log(test);

        user.password = undefined;

        // return user object
        return res.send(user);

        // return the new value of `bonkPoints` to the client, or user object
        // return res.send({bonkPoints: user.bonkPoints});
        // return res.send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const purchaseAutoClicker = async (req, res) => {
    let autoClickerCost = .01;
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        const address = req.query.address;
        // get their user object
        const user = await User.findOne({ address: address }).exec();


        // calculate the cost of the autoClicker
        if (user.autoClicker > 0) {
            autoClickerCost = autoClickerCost * (1 + (user.autoClicker * 1.7));
        }
        if (user.bonkPoints > autoClickerCost) {

            // update `autoClickerCount` by 1, which is an integer field on the user objct
            user.autoClicker++;

            user.bonkPoints -= autoClickerCost;

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

export const purchaseAutoClickerMultiplier = async (req, res) => {
    let autoClickerMultiplierCost = .01;
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        const address = req.query.address;
        // get their user object
        const user = await User.findById(req.auth._id).exec();

        // calculate the cost of the autoClicker
        autoClickerMultiplierCost = autoClickerMultiplierCost * (1 + (user.autoClickerMultiplierCount * 1.5));

        // update `autoClickerMultiplierCount` by 1, which is an integer field on the user objct
        user.autoClickerMultiplierCount++;

        user.bonkPoints -= autoClickerMultiplierCost;

        // save the user object
        await user.save();

        user.password = undefined;

        // return user object
        return res.send(user);

    } catch (err) {
        return res.status(500).send(err);
    }
};

export const purchaseClickPower = async (req, res) => {
    let clickPowerCost = .01;
    try {
        // make sure they're logged in
        // if (!req.auth._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        const address = req.query.address;
        // get their user object
        const user = await User.findById(req.auth._id).exec();

        // calculate the cost of the autoClicker
        clickPowerCost = clickPowerCost * (1 + (user.clickPower * 2));

        // update `clickPower` by 1, which is an integer field on the user objct
        user.clickPower++;

        user.bonkPoints -= clickPowerCost;


        // save the user object
        await user.save();

        user.password = undefined;

        // return user object
        return res.send(user);

    } catch (err) {
        return res.status(500).send(err);
    }
};
