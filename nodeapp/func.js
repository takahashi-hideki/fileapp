// session check
exports.session_check = function(req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.redirect('/login/login');
    }
};