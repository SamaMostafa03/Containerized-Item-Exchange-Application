import request from "supertest";

import {app} from "../server/app";
import sequelize from "../server/database/connection";
import buildTables from "../server/database/build";

beforeAll(() => {
  return buildTables();
});

describe("Statistics routes test!", () => {
  it("test donateTimes", async () => {
    const response = await request(app)
      .get("/api/v1/website/statistics")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({
        donateTimes: 6,
        exchangeTimes: 0,
        contributeTimes: 12,
      });
  });
});

afterAll(() => {
  return sequelize.close();
});
