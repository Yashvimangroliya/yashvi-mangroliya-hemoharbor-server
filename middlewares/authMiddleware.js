const JWT = require("jsonwebtoken");


module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // Handle token refresh logic
          const refreshedToken = generateNewToken(/* pass user ID if available */);
          
          // Set the new token in the response or headers
          res.setHeader('Authorization', `Bearer ${refreshedToken}`);
          
          // Continue with the request using the new token or without a user ID
          req.body.userId = decode ? decode.userId : null;
          next();
        } else {
          return res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: err.message,
          });
        }
      } else {
        req.body.userId = decode ? decode.userId : null;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

function generateNewToken(userId) {
  // Implement logic to generate a new token with a new expiration time
  const newToken = JWT.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10d' });
  return newToken;
}



// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err,decode) => {
//         if(err){
        
//             return res.status(401).send({
//                 success:false,
//                 message:"Auth fail",
//                 error: err.message,
//             })
//         }else {
//             req.body.userId = decode.userId;
//             next();
//         }
//     })
//   } catch (error) {
//     return res.status(401).send({
//         success:false,
//         message:'Auth Failedd',
//         error
//     })
//   }
// };
