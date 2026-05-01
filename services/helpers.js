const jwt = require('jsonwebtoken');

const generateAccToken = (user)=>{
  return jwt.sign(
    { 
      _id : user._id,
      email:user.email,
      role : user.role
    }, 
    process.env.JWT_SEC, 
    { expiresIn: '1h' });
}

const generateRefreshToken = (user)=>{
  return jwt.sign(
    { 
      _id : user._id,
      email:user.email,
      role : user.role
    }, 
    process.env.JWT_SEC, 
    { expiresIn: '15d' });
}

const verifyToken = (token)=>{
  try {
  const decoded = jwt.verify(token, process.env.JWT_SEC);
  return decoded
} catch(err) {
  return null
}
}

module.exports = {generateAccToken,generateRefreshToken,verifyToken}