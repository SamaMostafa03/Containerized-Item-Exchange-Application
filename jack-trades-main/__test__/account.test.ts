import request from "supertest";
import sequelize from "../server/database/connection";
import { app } from "../server/app";
import buildTables from "../server/database/build";

beforeAll(() => buildTables());
const token = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJKb2huQGdtYWlsLmNvbSIsImlhdCI6MTY2NjY5OTQxNn0.JczMifcbYE9z53Lmt9IL_QV7z3D7YA2wn0zZIFGwwjk";

describe("Validations tests should return errors messages to the user", () => {
  test("when user enters empty first Name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        lastName: "omar",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("First name is required");
      });
  });

  test("when user enters empty first Name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "",
        lastName: "omar",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("First name is required");
      });
  });

  test("returns error message when user enters invalid first name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "mohammed2",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "First name must be 2-20 characters long, and contain only letters."
        );
      });
  });

  test("returns error message when user enters empty last Name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "mohammed",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Last name is required");
      });
  });

  test("returns error message when user enters empty last Name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "mohammed",
        lastName: "",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Last name is required");
      });
  });

  test("returns error message when user enters invalid last name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar2",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "Last name must be 2-20 characters long, and contain only letters."
        );
      });
  });

  test("returns error message when user enters invalid last name", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar2",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "Last name must be 2-20 characters long, and contain only letters."
        );
      });
  });

  test("returns error message when user enters an empty email", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Email is required");
      });
  });

  test("returns error message when user enters an empty email", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Email is required");
      });
  });

  test("returns error message when user enters an invalid email", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmailcom",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Invalid Email");
      });
  });

  test("returns error message when user enters an invalid email", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammedgmail.com",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Invalid Email");
      });
  });

  test("returns error message when user enters an empty password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Password is required");
      });
  });

  test("returns error message when user enters an empty password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Password is required");
      });
  });

  test("returns error message when user enters an invalid password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "Password must be at least 6 characters, and contain letters, digits and special characters only."
        );
      });
  });

  test("returns error message when user enters an invalid password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password123",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "Password must be at least 6 characters, and contain letters, digits and special characters only."
        );
      });
  });

  test("returns error message when user enters an invalid password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password$",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "Password must be at least 6 characters, and contain letters, digits and special characters only."
        );
      });
  });

  test("returns error message when user enters not matched confirm password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password13$",
        confirmPassword: "",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Passwords are'nt matched");
      });
  });

  test("returns error message when user enters not matched confirm password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password13$",
        confirmPassword: "password123",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Passwords are'nt matched");
      });
  });

  test("returns error message when user enters not matched confirm password", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password13$",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Confirm Password is required");
      });
  });
});

describe("test signup when the user enters a valid inputs", () => {
  test("returns success message when user enters a valid inputs", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password13$",
        confirmPassword: "password13$",
      })
      .expect((res) => {
        expect(res.body.message).toEqual("Your Account Created Successfully");
      });
  });

  test("returns error message when user an existing email", async () => {
    await request(app)
      .post("/api/v1/account/signup")
      .send({
        firstName: "Mohammed",
        lastName: "Omar",
        email: "mohammed@gmail.com",
        password: "password13$",
        confirmPassword: "password13$",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "This email is already exist,Please check your email again"
        );
      });
  });
});

describe('SIGNIN// TESTS', () => {
  test("returns error message when user enters an empty email", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Email is required");
      });
  });

  test("returns error message when user enters an empty email", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Email is required");
      });
  });

  test("returns error message when user enters an invalid email", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1@hotmailcom",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Invalid Email");
      });
  });

  test("returns error message when user enters an invalid email", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1hotmailcom",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Invalid Email");
      });
  });

  test("returns error message when user enters an empty password", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1@hotmail.com",
        password: "",
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual("Password is required");
      });
  });

  test("returns error message when user enters an invalid password", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1@hotmail.com",
        password: "wrongpassword",
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "You entered a wrong password"
        );
      });
  });

  test("returns error message when user enters an invalid password", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1@hotmail.com",
        password: "password123",
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "You entered a wrong password"
        );
      });
  });

  test("returns error message when user enters an invalid password", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1@hotmail.com",
        password: "password$",
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toEqual(
          "You entered a wrong password"
        );
      });
  });
})

describe("SIGNIN// test signin when the user enters a valid inputs ", () => {
  test("returns success message when user enters a valid inputs", async () => {
    await request(app)
      .post("/api/v1/account/signin")
      .send({
        email: "hk1@hotmail.com",
        password: "aa123@",
      })
      .expect((res) => {
        expect(res.body.message).toEqual("logged successfully");
      });
  });
});

describe('LOGOUT// TESTS', () => {
  test('Is the user logged out or not', async () => {
    await request(app)
      .post("/api/v1/account/logout")
      .set("Cookie", `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJoazJAaG90bWFpbC5jb20iLCJpYXQiOjE2NjY2OTUyNzd9.f90CqOLJLlaYZSWbBHUmJA0fJEETkQR51zfLXsQw8Ys`)
      .expect(200)
      .expect(res => {
        expect(res.body.message).toEqual("Logged Out Successfully");
      })
  })
})
describe("check Auth route tests", () => {
  test("Should return 200 and the id of the logged user ", async () => {
    await request(app)
      .get("/api/v1/account/")
      .set('Cookie', token)
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual("{\"user\":{\"id\":1,\"lastName\":\"Smith\",\"firstName\":\"John\",\"userImage\":\"https://randomuser.me/api/portraits/lego/8.jpg\"}}");
      });
  });
  test("Should return 401 and the Unauthorized if the user doesn't signIn", async () => {
    await request(app)
      .get("/api/v1/account/")
      .set('Cookie', token + "Mohammed")
      .expect(200)
      .expect({ user: null })
  });
});

afterAll(() => sequelize.close());
