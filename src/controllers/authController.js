const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/users', async(req, res) => {
    try{
        const users = await User.find();
        return res.json({users});
    }catch(err){
        return res.json({err});
    }
    
});

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ erro: 'User already exists' });

        const user = await User.create(req.body);

        user.password = undefined;
        return res.send({ user });
    } catch(err){
        return res.status(400).send(err);
    }
});

module.exports = app => app.use('/auth', router);