const jwt = require('jsonwebtoken');

function userTokenCreate(user, req) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      refresh_token: user.refresh_token,
    },
    process.env['JWT_SECRET'],
    {
      expiresIn: '1m',
    }
  );
  req.response.cookie('Authorization', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  });
  return token;
}

async function refreshToken(prisma, authorization, req) {
  const token = jwt.decode(authorization);
  const user = await prisma.user({ id: token.id });
  if (user && user.refresh_token === token.refresh_token) {
    userTokenCreate(user, req);
    return user.role;
  }
  req.response.clearCookie('Authorization');
  return null;
}

module.exports = {
  userTokenCreate,
  tokenCheck: function(req, authorization, prisma) {
    try {
      return jwt.verify(authorization, process.env['JWT_SECRET']);
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        return refreshToken(prisma, authorization, req);
      return null;
    }
  },
};
