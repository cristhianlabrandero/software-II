var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
var passport = require('passport');
var AuthMiddleware = require('.././middleware/auth');
router.get('/', controllers.HomeController.index);
router.get('/register', controllers.UserController.register);
router.post('/register', controllers.UserController.postRegister);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/videos',
    failureRedirect: '/register',
    failureFlash: true
}));
router.get('/videos', AuthMiddleware.isLogged, controllers.VideoController.index);
router.get('/logout', AuthMiddleware.isLogged, controllers.UserController.logOut);
router.post('/upload', AuthMiddleware.isLogged, controllers.VideoController.uploadVideo);
router.get('/data', AuthMiddleware.isLogged, controllers.VideoController.showContent);
router.get('/analyze/:id', AuthMiddleware.isLogged, controllers.VideoController.analyze);
router.get('/details/:id', AuthMiddleware.isLogged, controllers.VideoController.detailsVideo);
router.get('/time', AuthMiddleware.isLogged, controllers.VideoController.realTime);
router.post('/time', AuthMiddleware.isLogged, controllers.VideoController.saveRalTimeVideo);
router.get('/restrictions', AuthMiddleware.isLogged, controllers.VideoController.getrestrictions);
router.post('/restrictions', AuthMiddleware.isLogged, controllers.VideoController.savetrestrictions);
module.exports = router;
