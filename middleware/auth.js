const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "TOKEN");
    if (decoded) {
      console.log(decoded);
      req.body.userID = decoded.userID;
      req.body.user = decoded.user;
      next();
    } else {
      res.json({ "msg": "Not authorized" });
    }
  } else {
    res.status(400).json({ "msg": "Please Login" });
  }
};

module.exports = {
  auth,
};
