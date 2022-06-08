const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'ici_c_est_un_test_password_h4K2_dh_KmlK_k_8_gpbv_qqh_Test');
        const userId = decodedToken.userId;
        if( req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        }
        else {
            next();
        }
    }
    catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};