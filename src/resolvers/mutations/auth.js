const bcrypt = require('bcryptjs');
const validator = require('validator');
const { userTokenCreate } = require('../../jwt');
const ErrorWithCode = require('../../errors');

function validateUser(username, password) {
  if (
    username !== undefined
    && (!validator.isAlphanumeric(username)
      || !validator.isLength(username, { min: 3, max: 20 }))
  ) {
    throw new ErrorWithCode('Invalid Username', 400);
  }
  if (password !== undefined && !validator.isLength(password, { min: 6 })) {
    throw new ErrorWithCode('Invalid Password', 400);
  }
}

module.exports = {
  login: async (root, { username, password }, context) => {
    const user = await context.prisma.user({ username });

    if (!user) {
      throw ErrorWithCode('Invalid username', 400);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ErrorWithCode('Invalid password', 400);
    }

    userTokenCreate(user, context);

    return user;
  },
  register: async (root, { username, password, picture }, context) => {
    validateUser(username, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await context.prisma.createUser({
      username,
      password: hashedPassword,
      picture,
      refresh_token: Math.random()
        .toString(36)
        .substr(2, 9),
    });
    return user;
  },
  logout: async (root, args, context) => {
    context.response.clearCookie('Authorization');
    return 'Success';
  },
  updateUser: async (root, args, context) => {
    if ((args.role || args.id) && context.jwt.role !== 'ADMIN') {
      return ErrorWithCode(
        `Only an admin can update ${args.role ? 'roles' : 'another user'}`,
        403,
      );
    }

    validateUser(args.username, args.password);
    const id = args.id || context.jwt.uid;
    const argsUser = args;
    delete argsUser.id;
    if (argsUser.password) {
      const cryptPassword = await bcrypt.hash(args.password, 10);
      argsUser.password = cryptPassword;
    }
    return context.prisma.updateUser({
      where: { id },
      data: argsUser,
    });
  },
};
