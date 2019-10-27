const bcrypt = require('bcryptjs');
var validator = require('validator');
const { userTokenCreate } = require('../../jwt');

function validateUser(username, password) {
  if (
    username !== undefined &&
    (!validator.isAlphanumeric(username) ||
      !validator.isLength(username, { min: 3, max: 20 }))
  )
    throw new Error('Invalid Username');
  if (password !== undefined && !validator.isLength(password, { min: 6 }))
    throw new Error('Invalid Password');
}

module.exports = {
  login: async (root, { username, password }, context) => {
    const user = await context.prisma.user({ username: username });

    if (!user) {
      throw new Error('Invalid username');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    userTokenCreate(user, context);

    return user;
  },
  register: async (root, { username, password }, context) => {
    validateUser(username, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await context.prisma.createUser({
      username,
      password: hashedPassword,
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
      return Error(
        `Only an admin can update ${args.role ? 'roles' : 'another user'}`
      );
    }

    validateUser(args.username, args.password);
    const id = args.id || context.jwt.uid;
    delete args.id;
    if (args.password) {
      const crypt_password = await bcrypt.hash(args.password, 10);
      args.password = crypt_password;
    }
    return context.prisma.updateUser({
      where: { id: id },
      data: args,
    });
  },
};
