const JWT = require('jsonwebtoken');
const cookie = require('cookie');

async function getJWT(req, prisma) {
  let authorization = undefined;
  let isSocket = false;
  if (req.connection && req.connection.context.cookie) {
    authorization = cookie.parse(req.connection.context.cookie).Authorization;
    isSocket = true;
  } else if (req.request.cookies)
    authorization = req.request.cookies.Authorization;

  return await tokenCheck(req, prisma, authorization, isSocket);
}

async function tokenCheck(req, prisma, authorization, isSocket) {
  if (!authorization) return null;
  if (isSocket) {
    const user = checkRefreshToken(prisma, authorization);
    if (user !== false) return user.role;
  }
  try {
    return JWT.verify(authorization, process.env['JWT_SECRET']);
  } catch (e) {
    // req.connection Don't refresh if it's a websocket
    if (!req.connection && e.name === 'TokenExpiredError')
      return refreshToken(prisma, authorization, req);
    console.error(e);
    return null;
  }
}

function userTokenCreate(user, req) {
  const newToken = {
    uid: user.id,
    username: user.username,
    role: user.role,
    refresh_token: user.refresh_token,
  };

  const token = JWT.sign(newToken, process.env['JWT_SECRET'], {
    expiresIn: process.env['JWT_EXPIRATION'],
  });
  req.response.cookie('Authorization', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  });
  return newToken;
}

async function checkRefreshToken(prisma, authorization) {
  const token = JWT.decode(authorization);
  const user = await prisma.user({ id: token.uid }).catch(error => {
    console.error('Invalid user in checkRefreshToken: ', token.uid, { error });
    return false;
  });

  if (user && user.refresh_token === token.refresh_token) return user;
  return false;
}

async function refreshToken(prisma, authorization, req) {
  const user = await checkRefreshToken(prisma, authorization);
  if (user !== false) {
    return await userTokenCreate(user, req);
  }
  await req.response.clearCookie('Authorization');
  return null;
}

module.exports = {
  userTokenCreate,
  getJWT,
};
