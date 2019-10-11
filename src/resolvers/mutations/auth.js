const bcrypt = require('bcryptjs');
const { userTokenCreate } = require('../../jwt');

module.exports = {
  login: async (root, { username, password }, context) => {
    const user = await context.prisma.user({ username });

    if (!user) {
      throw new Error('Invalid Login');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid Password');
    }

    userTokenCreate(user, context);

    return user;
  },
  register: async (root, { username, password }, context) => {
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
  updateRole(root, args, context) {
    return context.prisma.updateUser({
      where: { username: args.username },
      data: { role: args.role },
    });
  },
};
