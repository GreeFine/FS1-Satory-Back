const JWT = require('jsonwebtoken');

function userTokenCreate(user, req) {
  const token = JWT.sign(
    {
      uid: user.id,
      username: user.username,
      role: user.role,
      refresh_token: user.refresh_token,
    },
    process.env['JWT_SECRET'],
    {
      expiresIn: '5m',
    }
  );
  req.response.cookie('Authorization', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  });
  return token;
}

async function refreshToken(prisma, authorization, req) {
  const token = JWT.decode(authorization);
  const user = await prisma.user({ id: token.uid });
  if (user && user.refresh_token === token.refresh_token) {
    userTokenCreate(user, req);
    return user.role;
  }
  await req.response.clearCookie('Authorization');
  return null;
}

module.exports = {
  userTokenCreate,
  tokenCheck: function(req, authorization, prisma) {
    if (!authorization) return null;
    try {
      const jwt = JWT.verify(authorization, process.env['JWT_SECRET']);
      return jwt;
    } catch (e) {
      if (e.name === 'TokenExpiredError')
        return refreshToken(prisma, authorization, req);
      return null;
    }
  },
};
