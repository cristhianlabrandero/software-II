module.exports = {
    index: function (req, response, next) {
        response.render('home', {
            isAuth: req.isAuthenticated(),
            user: req.user
        });
    }
};