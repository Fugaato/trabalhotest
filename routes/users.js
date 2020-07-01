const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const SECRET = require('../config/auth');

// const passport = require('passport');

// User model
const User = require('../models/User');
const { map } = require('../app');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.post('/register', (req, res) => {
    const { name, patente, idade, matricula, admin=false, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !patente || !idade || !matricula || !password || !password2) {
        errors.push({ msg: 'Por favor complete todos os campos' })
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'As senhas não conferem!' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            patente,
            idade,
            admin,
            matricula,
            password,
            password2
        });
    }

    else {
        // Validation passed
        User.findOne({ matricula: matricula }).then(user => {
                if(user) {
                    // User exists
                    errors.push({ msg: 'Matricula ja cadastrada' })

                    res.render('register', {
                        errors,
                        name,
                        patente,
                        idade,
                        admin,
                        matricula,
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User({
                        name,
                        patente,
                        idade,
                        matricula,
                        admin,
                        password,
                    });
                    if(!newUser.admin){
                        newUser.admin = false;
                    }

                    // Hash Password
                        var password_hash = crypto.createHash("sha1").update(newUser.password + SECRET.secret).digest("base64");
                        newUser.password = password_hash;
                            // Save user
                            newUser.save()
                                .then(user => {
                                    console.log("Deu boa, voce foi cadastrado!")
                                    res.redirect('/users/login');

                                })
                                .catch(err => {
                                    console.log(err);
                                    res.redirect('/users/register');
                                })
                    console.log(newUser);
                    
                }
            }
        );
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    var { mat, pass} = req.body;
     console.log(req.body);
     console.log(mat);
     console.log(pass);

     if(pass != '123123'){
    var password_hash = crypto.createHash("sha1").update(pass + SECRET.secret).digest("base64");    
    pass = password_hash;
    }

    var redirect = null;
    User.find({ matricula: mat, password: pass }, function (err, sucesso) {

        if (sucesso.length <= 0) {
            console.log("NAO ACHOO GALERA SINTO MUITO");
            console.log(pass);
             res.redirect('/'); 
        }
        else {  
            console.log(sucesso);
            if(!sucesso[0].admin){
                console.log(sucesso.admin);
                console.log("Indo para o Padrao");
                global = false;
                 res.redirect('/dashPadrao');
            }
            else{  
                console.log("Indo para o ADM");
                global = true;
                 res.redirect('/dashADM');
            }
        }
        
       if (err){
           console.log(err);
       }

    }
    );
});

// Lougout Handle
router.get('/logout', (req, res) => {
    res.redirect('/users/login');
});

module.exports = router;