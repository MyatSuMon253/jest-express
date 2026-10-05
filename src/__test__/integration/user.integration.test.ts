import request from "supertest";
import app from "../../app.js";
import { UserService } from "../../services/usersService.js";

// automatically mock the whole service module
jest.mock("../../services/usersService");

beforeEach(async () => {
  jest.clearAllMocks();
});

describe("POST /users", () => {
  const userInput = { name: "Alice", email: "alice@gmail.com" };
  const createdUser = { id: "123", name: "Alice", email: "alice@gmail.com" };

  describe("success path", () => {
    beforeEach(async () => {
      (UserService.create as jest.Mock).mockResolvedValue(createdUser);
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

  describe("service error - DB error", () => {
    beforeEach(async () => {
      (UserService.create as jest.Mock).mockRejectedValue(new Error("DB down"));
    });

    test("should return 500 with a generic error message", async () => {
      const res = await request(app)
        .post("/users")
        .send(userInput)
        .set("Accept", "application/json");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "user creation failed" });
    });
  });

  describe("validation error 400", () => {
    test("should return 400 when name is missing", async () => {
      const res = await request(app)
        .post("/users")
        .send({ email: "bob@gmail.com" })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "name is required");
      expect(UserService.create).not.toHaveBeenCalled();
    });
  });
});
