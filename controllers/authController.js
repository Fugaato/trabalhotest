const express = require('express');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User =  require('../models/user');

const router = express.Router();

router.post('/register' , async (req, res ) => {
    try{
        if(await User.findOne({ matricula }))
        return res.status(400).send({error: 'Matricula ja cadastrado '});
        const user = User.create(req.body);

        return  res.send({
            user,
            token : generateToken({ id: user.id })
        });
    }
    catch{
        return res.status(400).send({error: 'Registration Failed'});
    }
});

router.post('/authenticate', async (req, res) => {
    const {matricula, password } = req.body;

    const user = await (await User.findOne({matricula})).isSelected('+password');

    if(!user)
        return res.status(400).send({error: 'User not found'});
    
    if(!await bcrypt.compare(password, user.password))
        return res.status.send({error: 'Invalid Password'});
    
    user.password = undefined;    

    const token = jwt.sign({id: user.id}, authConfig.secret, {
       expiresIn: 86400,
    });
    
    res.send({
        user,
        token : generateToken({ id: user.id })
    });
});

module.exports = app => app.use('/auth' , router);