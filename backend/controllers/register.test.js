const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server");

describe("POST /auth/register", () => {
  describe("given a name , email and password", () => {
    test("should respond with a status code of 200", async () => {
      const response = await request(app)
        .post("/tratrac-health/api/v1/auth/register")
        .send({
          name: "test4", // make sure you provide a name
          email: "test4@gmail.com", // use an email that has not been used before
          password: "test4", //make sure you provide a password
        });
      expect(response.statusCode).toBe(200);
    }, 20000);
    test("should respond with a status code of 401 if patient already exist", async () => {
      const response = await request(app)
        .post("/tratrac-health/api/v1/auth/register")
        .send({
          name: "", // make sure you provide a name
          email: "", // use an email that has been used before
          password: "", //make sure you provide a password
        });
      expect(response.statusCode).toBe(401);
    }, 20000);
  });
  describe("not given a name or email or password", () => {
    test("should respond with a status code of 400", async () => {
      const response = await request(app)
        .post("/tratrac-health/api/v1/auth/register")
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
