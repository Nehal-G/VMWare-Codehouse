const jwt = require("jsonwebtoken");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    accessTokenSecret = require("./keys").secretOrKey

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(err)
                console.log(token)
                console.log(accessTokenSecret)
                return res.sendStatus(403);
            }

            req.user = user;
            console.log(user)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT