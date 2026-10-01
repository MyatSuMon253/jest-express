export const UserService = {
  async create(user: { name: string; email: string }) {
    // simulating db logic
    return { id: "123", ...user };
  },
};
