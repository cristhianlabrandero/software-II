var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var config = require('../database/config');
module.exports = {
    login: function (req, res, next) {
        return res.render('users/auth/login', {
            message: req.flash('info')
        })
    },
    register: function (req, res, next) {
        return res.render('users/auth/register', {
            message: req.flash('info'),
            authmessage: req.flash('authmessage'),
            isAuth: req.isAuthenticated()
        })
    },
    postRegister: function (req, res, next) {
        console.log(req.body);

        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.password, salt);
        var user = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            created_at: Date.toString(),
            updated_at: Date.toString()
        };
        var db = mysql.createConnection(config);
        db.connect();
        db.query('INSERT INTO users SET ?', user, function (err, rows, fields) {
            if (err) throw  err;
            db.end();
        });
        //envio el mensaje flash
        req.flash('info', 'Se ha registrado correctamente,inicie sesion');
        return res.redirect('/register');

    },

    logOut: function (req, res, next) {
        console.log("Logout");
        req.logout();
        res.redirect('/register');
    }

};