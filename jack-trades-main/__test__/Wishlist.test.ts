import request from "supertest";

import { app } from "../server/app";
import sequelize from "../server/database/connection";
import buildTables from "../server/database/build";

const token = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJKb2huQGdtYWlsLmNvbSIsImlhdCI6MTY2NjY5OTQxNn0.JczMifcbYE9z53Lmt9IL_QV7z3D7YA2wn0zZIFGwwjk";
const token2 = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJMYXVyZXRlQGdtYWlsLmNvbSIsImlhdCI6MTY2Njk0ODQzM30.4Tr-ZSgxK1R1Kd8YMmkzdgd2soIVMpGI1v08zgorOUg";
beforeAll(() => buildTables());

// this test should be at the first because the values will be changed in the next tests 
describe("get all wish list route", () => {
    it("Should return all items in the wishlist for the sigIn user", async () => {
        await request(app)
            .get("/api/v1/wishlist?offset=0&limit=3")
            .expect(200)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).toEqual({
                    count: 1,
                    rows: [
                        {
                            "id": 1,
                            "product_id": 1,
                            "title": "nice sofa",
                            "description": "sofa for four people",
                            "gallery": [
                                "https://apollo-singapore.akamaized.net/v1/files/sh0il57qfjfh3-IN/image;s=780x0;q=60 ",
                                "https://apollo-singapore.akamaized.net/v1/files/zjt3gsd2oobm2-IN/image;s=780x0;q=60"
                            ]
                        }
                    ],
                })
            });
    });

    it("Should return (no items found, message) when the wishlist is empty", async () => {
        await request(app)
            .get("/api/v1/wishlist?offset=0&limit=3")
            .expect(200)
            .set("Cookie", token2)
            .expect("Content-Type", /json/)
            .expect((res) => expect(res.body).toEqual({ count: 0, rows: [] }
            ));
    });

    it("Should return 401 and Unauthorized if the user doesn't signIn", async () => {
        await request(app)
            .get("/api/v1/wishlist/")
            .expect(401)
            .set("Cookie", token2 + 2)
            .expect("Content-Type", /json/)
            .expect({ message: "Unauthorized" })
    });
});

// checkReqFav route
describe("check user wishList route", () => {
    it("Should return true if the product exists in the usr's wishList", async () => {
        await request(app)
            .get("/api/v1/wishlist/1")
            .expect(200)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect((res) => expect(res.body).toEqual(true));
    });

    it("Should return false if the product doesn't exist in the usr's wishList", async () => {
        await request(app)
            .get("/api/v1/wishlist/2")
            .expect(200)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect((res) => expect(res.body).toEqual(false));
    });

    it("Should return 401 and Unauthorized if the user doesn't signIn", async () => {
        await request(app)
            .get("/api/v1/wishlist/2")
            .expect(401)
            .set("Cookie", `${token}1`)
            .expect("Content-Type", /json/)
            .expect({
                message: "Unauthorized",
            });
    });
});

// add to wishlist route
describe("Add to wishlist route", () => {
    it("Should return 201 and (added successfully, message) when the user added the product to the wishList", async () => {
        await request(app)
            .post("/api/v1/wishlist/5")
            .expect(201)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({
                message: "You added the product to the wishlist successfully",
            });
    });

    // test get all items route again, after the user added some product to his wishlist 
    describe("get all wish list route", () => {
        it("Should return all items in the wishlist for the sigIn user", async () => {
            await request(app)
                .get("/api/v1/wishlist?offset=0&limit=3")
                .expect(200)
                .set("Cookie", token)
                .expect("Content-Type", /json/)
                .expect((res) => {
                    expect(res.body).toEqual({
                        count: 2,
                        rows: [
                            {
                                id: 1,
                                product_id: 1,
                                title: 'nice sofa',
                                gallery: [
                                    "https://apollo-singapore.akamaized.net/v1/files/sh0il57qfjfh3-IN/image;s=780x0;q=60 ",
                                    "https://apollo-singapore.akamaized.net/v1/files/zjt3gsd2oobm2-IN/image;s=780x0;q=60",
                                ],
                                description: 'sofa for four people'
                            },
                            {
                                id: 5,
                                product_id: 5,
                                title: 'Earbuds',
                                gallery: [
                                    "https://apollo-singapore.akamaized.net/v1/files/t5h1o07v3ziq2-IN/image;s=780x0;q=60",
                                    "https://apollo-singapore.akamaized.net/v1/files/uc39iu95kda51-IN/image;s=780x0;q=60",
                                    "https://apollo-singapore.akamaized.net/v1/files/8sol0kdbo0xz1-IN/image;s=780x0;q=60",
                                ],
                                description: 'Used, perfectly working.Earbuds and charging case.Enjoy uninterrupted, crystal-clear music on the go with the Jabra Elite Active 65t True Wireless EarPods with Mic. With up to 5 hours of battery life from a single charge, and up to 15 hours in total with the pocket-friendly charging case '
                            }
                        ]
                    })

                });
        });
    });

    it("Should return 400 and (error message) when the user added his product to the wishList", async () => {
        await request(app)
            .post("/api/v1/wishlist/3")
            .expect(400)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({
                message: "You can not add your items to your wishlist",
            });
    });

    it("Should return 400 and (error message) when the user try to add same product to the wishList again", async () => {
        await request(app)
            .post("/api/v1/wishlist/5")
            .expect(400)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({
                message: "This item is already exist in the WishList",
            });
    });

    it("Should return 400 and (Bad request message) when the user added invalid product id in the params", async () => {
        await request(app)
            .post("/api/v1/wishlist/ss") // ss >> is invalid id
            .expect(400)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({
                message: "Bad Request",
            });
    });

    it("Should return 401 and Unauthorized if the user doesn't signIn", async () => {
        await request(app)
            .post("/api/v1/wishlist/2")
            .expect(401)
            .set("Cookie", `${token}sqs`)
            .expect("Content-Type", /json/)
            .expect({ message: "Unauthorized" });
    });
});

// Delete from wishlist route
describe("delete from wishlist route", () => {
    it("Should return 200 and (deleted successfully, message) when the user delete the product from the wishList", async () => {
        await request(app)
            .delete("/api/v1/wishlist/1")
            .expect(200)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({
                message: "You removed the product from the wishlist successfully",
            });
    });

    it("Should return 400 and (error message) when the user try to delete the same product again", async () => {
        await request(app)
            .delete("/api/v1/wishlist/1")
            .expect(400)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({ message: "This item is already removed from your wishlist" });
    });

    it("Should return 400 and (error message) when the user added invalid product id in the params", async () => {
        await request(app)
            .delete("/api/v1/wishlist/sqe1") // sqs1 is a invalid id
            .expect(400)
            .set("Cookie", token)
            .expect("Content-Type", /json/)
            .expect({ message: "Bad Request" });
    });

    it("Should return 401 and Unauthorized if the user doesn't signIn", async () => {
        await request(app)
            .delete("/api/v1/wishlist/3")
            .expect(401)
            .set("Cookie", `token`)
            .expect("Content-Type", /json/)
            .expect({ message: "Unauthorized" });
    });
});
// get all wishlist items route





afterAll(() => sequelize.close());
