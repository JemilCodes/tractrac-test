const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server");

describe("POST /auth/login", () => {
  describe("given an email and password", () => {
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .post("/tratrac-health/api/v1/auth/login")
        .send({
          email: "", // make sure you provide an email already registered
          password: "", //make sure you provide a password already registered
        });
      expect(response.statusCode).toBe(200);
    }, 20000);
    test("should respond with a status code of 400 if patient does not exist", async () => {
      const response = await request(app)
        .post("/tratrac-health/api/v1/auth/login")
        .send({
          email: "", //  use an email that has been used registered
          password: "", //make sure you provide a password
        });
      expect(response.statusCode).toBe(400);
    }, 20000);
  });
  describe("not given an email or password", () => {
    test("should respond with a status code of 400", async () => {
      const response = await request(app)
        .post("/tratrac-health/api/v1/auth/login")
        .send({
          name: "", // make sure you provide a name
          email: "", // use an email that has not been used before
          password: "", //make sure you provide a password
        });
      expect(response.statusCode).toBe(400);
    }, 20000);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
