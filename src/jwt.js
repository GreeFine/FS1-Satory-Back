const JWT = require('jsonwebtoken');
const cookie = require('cookie');

function userToToken(user) {
  return {
    uid: user.id,
    username: user.username,
    role: user.role,
    refresh_token: user.refresh_token,
  };
}

function userTokenCreate(user, req) {
  const newToken = userToToken(user);
  const token = JWT.sign(newToken, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  req.response.cookie('Authorization', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  });
  return newToken;
}

async function checkRefreshToken(prisma, authorization) {
  const token = JWT.decode(authorization);
  const user = await prisma.user({ id: token.uid }).catch((error) => {
    console.error('Invalid user in checkRefreshToken: ', token.uid, { error });
    return null;
  });
  if (user && user.refresh_token === token.refresh_token) return user;
  return null;
}

async function refreshToken(prisma, authorization, req) {
  const user = await checkRefreshToken(prisma, authorization);
  if (user !== null) return userTokenCreate(user, req);
  await req.response.clearCookie('Authorization');
  return null;
}

async function tokenCheck(req, prisma, authorization, isSocket) {
  if (!authorization) return null;
  if (isSocket) {
    return checkRefreshToken(prisma, authorization);
  }
  try {
    return JWT.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') return refreshToken(prisma, authorization, req);
    console.error(error);
    return null;
  }
}

async function getJWT(req, prisma) {
  let authorization;
  let isSocket = false;
  if (req.connection) {
    if (req.connection.context.cookie) {
      authorization = cookie.parse(req.connection.context.cookie).Authorization;
    }
    isSocket = true;
  } else if (req.request.cookies) { authorization = req.request.cookies.Authorization; }

  return tokenCheck(req, prisma, authorization, isSocket);
}

module.exports = {
  userTokenCreate,
  getJWT,
};
