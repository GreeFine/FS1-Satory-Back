const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const token = jwt.sign(
      {
        id: user.id,
        username: user.email,
        role: user.role,
      },
      process.env['JWT_SECRET'],
      {
        expiresIn: '30d',
      }
    );
    context.response.cookie('Authorization', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31,
    });

    return {
      token,
      user,
    };
  },
  register: async (root, { username, password }, context) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await context.prisma.createUser({
      username,
      password: hashedPassword,
    });
    return user;
  },
  logout: async (root, args, context) => {
    context.response.clearCookie('Authorization');
    return 'Success';
  },
  createDraft(root, { title, userId }, context) {
    return context.prisma.createPost({
      title: title,
      author: {
        connect: { id: userId },
      },
    });
  },
  publish(root, args, context) {
    return context.prisma.updatePost({
      where: { id: args.postId },
      data: { published: true },
    });
  },
  updateRole(root, args, context) {
    return context.prisma.updateUser({
      where: { username: args.username },
      data: { role: args.role },
    });
  },
};
