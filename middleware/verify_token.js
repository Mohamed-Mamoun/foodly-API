const jwt = require("jsonwebtoken");

// -> Function To verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWTSECRET, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, message: "invalid Token" });
      }

      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated" });
  }
};

// -> Function To verify Token and Authorize user
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Admin" ||
      req.user.userType === "Vendor" ||
      req.user.userType === "Driver"
    ) {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: " You Don't have access " });
    }
  });
};

// -> Function To and Authorize Vendor user
const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin" || req.user.userType === "Vendor") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: " You Don't have access " });
    }
  });
};

// -> Function To and Authorize Admin user
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: " You Don't have access " });
    }
  });
};

// -> Function To and Authorize Driver user
const verifyDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin" || req.user.userType === "Driver") {
      next();
    } else {
      return res
        .status(403)
        .json({ status: false, message: " You Don't have access " });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyVendor,
  verifyAdmin,
  verifyDriver,
};
