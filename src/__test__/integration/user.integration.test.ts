import request from "supertest";
import app from "../../app.js";
import { UserService } from "../../services/usersService.js";

// automatically mock the whole service module
jest.mock("../../services/usersService");

describe("POST /users", () => {
  const userInput = { name: "Alice", email: "alice@gmail.com" };
  const createdUser = { id: "123", name: "Alice", email: "alice@gmail.com" };

  describe("success path", () => {
    beforeEach(async () => {
      (UserService.create as jest.Mock).mockReturnValue(createdUser);
    });

    test("should return 201 and created user", async () => {
      const res = await request(app)
        .post("/users")
        .send(userInput)
        .set("Accept", "application/json");

      expect(res.status).toBe(201);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(createdUser);

      expect(UserService.create).toHaveBeenCalledTimes(1);
      expect(UserService.create).toHaveBeenCalledWith(userInput);
    });
  });
});
