import request from "supertest";

import {app} from "../server/app";
import sequelize from "../server/database/connection";
import buildTables from "../server/database/build";

beforeAll(() => buildTables());

describe("Testing user profile informations", () => {
  it("right USERID and return profile  information successfully!", async () => {
    const response = await request(app)
      .get("/api/v1/user/5")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({
        first_name: "Laurete",
        last_name: "da Cunha",
        image: "https://randomuser.me/api/portraits/lego/4.jpg",
        bio: "hello from the hell",
        email: 'Laurete@gmail.com'
      });
  });

  it("wrong USERID and return a massage describe the error", async () => {
    const response = await request(app)
      .get("/api/v1/user/100")
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({
        message: "Opss, User Not Found",
      });
  });

  it("When userId is not a number", async () => {
    const response = await request(app)
      .get("/api/v1/user/anyThing")
      .expect(400)
      .expect("Content-Type", /json/)
      .expect({
        message: "Opss, Bad Request",
      });
  });

  it("When userId is small than zero", async () => {
    const response = await request(app)
      .get("/api/v1/user/-1")
      .expect(400)
      .expect("Content-Type", /json/)
      .expect({
        message: "Opss, Bad Request",
      });
  });
});

describe("user route tests", () => {
  it("testing getting the user products", async () => {
    await request(app)
      .get("/api/v1/user/5/products?offset=0")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.count).toBe(1);
        expect(res.body.rows[0].id).toBe(8);
        expect(res.body.rows[0].title).toBe(
          "Louis Vuitton Jacques Durand Sunglasses Black Sunglasses"
        );
      });
  });

  it("testing getting the user products", async () => {
    await request(app)
      .get("/api/v1/user/2/products?offset=0")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.count).toBe(5);
        expect(res.body.rows[0].id).toBe(1);
      });
  });

  it("testing getting the user products", async () => {
    await request(app)
      .get("/api/v1/user/hello/products")
      .expect(400)
      .expect("Content-Type", /json/)
      .expect({
        message: "Bad Request",
      });
  });
});

afterAll(() => sequelize.close());
