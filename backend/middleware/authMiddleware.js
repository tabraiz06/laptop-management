const jwt = require("jsonwebtoken");

const protect = (roles=[]) => {
  return (req, res, next) => {
     const token = req.header("token");
     
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      req.user = decoded;
      console.log(roles)
       if (roles.length<0 ) {
         return res.status(403).json({ message: "Forbidden" });
       }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = { protect };
