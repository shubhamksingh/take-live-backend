const router = require('express').Router();
const User = require('../Models/user');
const jwt = require('jsonwebtoken');


//signup route
router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    });

    try {
        // check if user already exists
        const userExists = await User.findOne({username: req.body.username});
        if (userExists) return res.status(400).json({message: 'User already exists', err : true});
        const savedUser = await user.save();
        res.status(200).json({message: 'User created successfully', err : false, user: savedUser});
    } catch (err) {
        res.status(400).json({message: err, err: true});
    }
});



//login route
router.post('/login', async (req, res) => {
        const user = await User.findOne({username: req.body.username});
        // !user && res.status(401).json('Wrong credentials');
        if (!user) return res.status(400).json({message :'Username  not found', err : true});
        if (user.password !== req.body.password) return res.status(400).send('Invalid password');

        const accessToken =  jwt.sign({
            _id : user._id,
            name: user.name,
            username: user.username,
        }, 'playo',
        {expiresIn : '1d'});
        res.status(200).json({user, accessToken, message:'Login successful', err : false});
});


module.exports = router;
