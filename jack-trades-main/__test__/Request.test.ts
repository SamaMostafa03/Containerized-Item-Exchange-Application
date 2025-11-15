import request from "supertest";

import { app } from "../server/app";
import sequelize from "../server/database/connection";
import buildTables from "../server/database/build";

beforeAll(() => {
    return buildTables();
});
const token = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJKb2huQGdtYWlsLmNvbSIsImlhdCI6MTY2NjY5OTQxNn0.JczMifcbYE9z53Lmt9IL_QV7z3D7YA2wn0zZIFGwwjk";
const token2 = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJMYXVyZXRlQGdtYWlsLmNvbSIsImlhdCI6MTY2NzUwODg3N30.7_yQeTC9Z2TQVol1gL3qtV7Rf-jUKiFgjRKl4AaO58k";
const token3 = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJNYXhpbUBnbWFpbC5jb20iLCJpYXQiOjE2Njc1MTI3Nzh9.yyuchzs-cvuoPSmyuKinpf1d9nuD3UgtoIkiveg761k";

describe("Test Add New Requests", () => {
    it("validate request inputs>> should return 400 when the user enters invalid productId ", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": "sq",
                "products": [1, 5]
            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "\"productId\" must be a number"
            });
    });

    it("validate request inputs>> should return 400 when the user enters invalid products ", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 3,
                "products": "[1,5]"
            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "\"products\" must be an array"
            });
    });

    it("validate request inputs>> should return 400 when the user doesn't add a productId ", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "products": "[1,5]"
            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "\"productId\" is required"
            });
    });

    it("validate request inputs>> should return 400 when the user doesn't add a products ", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "Please add products to exchange"
            });
    });

    it("validate request inputs>> should return 400 when the user doesn't add a products ", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [],

            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "Please add products to exchange"
            });
    });

    it("validate request inputs>> should return 400 when the user enters invalid productId", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 99,
                "products": [],

            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "Please request a valid product"
            });
    });

    it("should return 400 when the user make a request at his own items ", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 3,
                "products": [3],

            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "You can't request your items"
            });
    });

    it("should return 400 when the user enters invalid products id", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [7, 8],

            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                "message": "Please check your selected product"
            });
    });
    // id = 1
    it("should return 201 when the user made a success request", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [3],

            })
            .set('Cookie', token)
            .expect(201)
            .expect("Content-Type", /json/)
            .expect({
                message: 'request sent successfully'
            });
    });

    it("should return 400 when the user request the same item again", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [3],

            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({
                message: 'You already requested this item'
            });
    });
});

describe('Test get all requests route', () => {
    it("Should return all requests", async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', token)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.count).toBe(1);
                expect(res.body.rows[0].status).toBe('pending');
                expect(res.body.rows[0].id).toBe(1);
                expect(res.body.rows[0].receiver_id).toBe(3);
                expect(res.body.rows[0].product_id).toBe(7);
            });
    });

    it("Should return no requests yet, message if the user didn't add any request", async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', token2)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.count).toBe(0);
            });
    });

    // Adding new requests, then send a (Request) to getAllRequests route agin
    it("should return 201 when the user made a success request", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 8,
                "products": [3, 4, 6],
            })
            .set('Cookie', token)
            .expect(201)
            .expect("Content-Type", /json/)
            .expect({
                message: 'request sent successfully'
            });
    });


    it("Should return all requests with the new requests added", async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', token)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                // length is 2 now
                expect(res.body.count).toBe(2);
                expect(res.body.rows[1].status).toBe('pending');
                expect(res.body.rows[1].products.length).toBe(3);
                expect(res.body.rows[1].id).toBe(2);
                expect(res.body.rows[1].receiver_id).toBe(5);
                expect(res.body.rows[1].product_id).toBe(8);

            });
    });

    // add new request to the user with token2 to help with the incoming tests
    it("should return 201 when the user made a success request", async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [8],

            })
            .set('Cookie', token2)
            .expect(201)
            .expect("Content-Type", /json/)
            .expect({
                message: 'request sent successfully'
            });
    });

    it("test get request route Should return Unauthorized for not sign user ", async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', 'qeqe')
            .expect(401)
            .expect("Content-Type", /json/)
            .expect({
                message: 'Unauthorized'
            })
    });
});

describe('Test get all offered products route', () => {
    // it("Should return all products offered by the sender user", async () => {
    //     await request(app)
    //         .get("/api/v1/requests/products/1")
    //         .set('Cookie', token)
    //         .expect(200)
    //         .expect("Content-Type", /json/)
    //         .expect((res) => {
    //             expect(res.body).toEqual(
    //                 {
    //                     message: [
    //                         {
    //                             title: 'White Charger',
    //                             type: 'exchange',
    //                             description: 'Apple series 7 charging lead',
    //                             gallery: ["https://apollo-singapore.akamaized.net/v1/files/i6c5sdoqjous2-IN/image;s=780x0;q=60"]
    //                         }
    //                     ]
    //                 }
    //             )

    //         });
    // });

    // it("Should return all products offered by the sender user", async () => {
    //     await request(app)
    //         .get("/api/v1/requests/products/2")
    //         .set('Cookie', token)
    //         .expect(200)
    //         .expect("Content-Type", /json/)
    //         .expect((res) => {
    //             expect(res.body).toEqual(
    //                 {
    //                     message: [
    //                         {
    //                             title: 'White Charger',
    //                             type: 'exchange',
    //                             description: 'Apple series 7 charging lead',
    //                             gallery: [
    //                                 'https://apollo-singapore.akamaized.net/v1/files/i6c5sdoqjous2-IN/image;s=780x0;q=60'
    //                             ]
    //                         },
    //                         {
    //                             title: 'Aerpods',
    //                             type: 'exchange',
    //                             description: 'Aerpods pro good condition',
    //                             gallery: [
    //                                 'https://apollo-singapore.akamaized.net/v1/files/dziq01lffmmf3-IN/image;s=780x0;q=60'
    //                             ]
    //                         },
    //                         {
    //                             title: 'Emanuel Ungaro',
    //                             type: 'exchange',
    //                             description: 'Scarf/Shawl Silk in Pink',
    //                             gallery: [
    //                                 'https://cdn.rebelle.com//86/8649678_e246ef6fa2d1af3d1e05d046263e29df.jpg?width=514&height=510',
    //                                 'https://cdn.rebelle.com//86/8649678_58cb3e40d41a9275e6bdb51a69c6f7ed.jpg?width=514&height=510'
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             )
    //         });
    // });

    it("Should return an error message when the user tries to return products for a request that does not belong to him", async () => {
        await request(app)
            .get("/api/v1/requests/products/1")
            .set('Cookie', token2)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Please check your request');

            });
    });

    it("Should return bad request when the user enters invalid request id", async () => {
        await request(app)
            .get("/api/v1/requests/products/nice")
            .set('Cookie', token)
            .expect(401)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Bad Request');

            });
    });
});

describe('Test delete request route', () => {
    it("should return success message when the user tries to delete his owen request", async () => {
        await request(app)
            .delete("/api/v1/requests/1")
            .set('Cookie', token)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).toBe('request canceled successfully');
            });
    });

    // now call getAllRequest router again to check the updated data
    it("should return all requests without deleted requests", async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', token)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.count).toBe(1);
                expect(res.body.rows[0].id).toBe(2);
            });
    });

    it("should return error message when the user tries to delete requests that does'nt belong to him", async () => {
        await request(app)
            .delete("/api/v1/requests/3")
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Please check your selected request again');
            });
    });

});

describe('Test update request route', () => {
    test('should return an error message when the user tries to update a request that does\nt exist anymore', async () => {
        await request(app)
            .put("/api/v1/requests/2")
            .send({
                receiverApproval: true,
                productId: 2,
            })
            .set('Cookie', token)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.message).toBe('This request does\'nt exist anymore');
            });
    });

    test('should return a success message when the user rejects the received request', async () => {
        await request(app)
            .put("/api/v1/requests/3")
            .send({
                receiverApproval: false,
            })
            .set('Cookie', token3)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).toBe('You decline the request');
            });
    });

    // Now call getAllRequest router again to check the updated data
    test('should return the request with the new updates', async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', token2)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.rows[0].status).toBe('fail');
            });
    });

    test('the user should be able to send a new request after the first one failed', async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [8],

            })
            .set('Cookie', token2)
            .expect(201)
            .expect("Content-Type", /json/)
            .expect({
                message: 'request sent successfully'
            });
    });
    // Now call getAllRequest router again to check the updated data
    test('should return the request with the new updates', async () => {
        await request(app)
            .get("/api/v1/requests/")
            .set('Cookie', token2)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                // the old request 
                expect(res.body.rows[0].status).toBe('fail');
                expect(res.body.rows[0].receiver_approval).toBe(false);
                // the new requestconsole.log(res.body)
                expect(res.body.rows[1].status).toBe('pending');
                expect(res.body.rows[1].receiver_approval).toBe(null);

            });
    });

    test('should return an error message when the user select one from not offered products', async () => {
        await request(app)
            .put("/api/v1/requests/4")
            .send({
                receiverApproval: true,
                products: 10,
            })
            .set('Cookie', token3)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Choose one of the offered products');
            });
    });

    // Now we will send a new request for product with id 7
    // so the receiver will have two requests, and he will accept one of them and cancel the other automatically.
    test('add many requests to the same product', async () => {
        await request(app)
            .post("/api/v1/requests/")
            .send({
                "productId": 7,
                "products": [3, 4],
            })
            .set('Cookie', token)
            .expect(201)
            .expect("Content-Type", /json/)
            .expect({
                message: 'request sent successfully'
            });
    });

    // test('should return all requests that the user got, and that\'s in the notifications route', async () => {
    //     await request(app)
    //         .get("/api/v1/notifications/")
    //         .set('Cookie', token3)
    //         .expect(200)
    //         .expect("Content-Type", /json/)
    //         .expect((res) => {      
    //             console.log(res.body.length)
    //             expect(res.body.length).toBe(4);
    //             expect(res.body[0].id).toBe(1);
    //             expect(res.body[0].deletedAt).toBeTruthy(); // request canceled before
    //             expect(res.body[1].id).toBe(5);
    //             expect(res.body[3].id).toBe(4);
    //         });
    // });

    test('should return success message when exchange operation done', async () => {
        await request(app)
            .put("/api/v1/requests/4")
            .set('Cookie', token3)
            .send({
                receiverApproval: true,
                productId: 8,
            })
            .expect('"Operation done successfully"');
    });

    // test('All requests must be returned with their new status', async () => {
    //     await request(app)
    //         .get("/api/v1/notifications/")
    //         .set('Cookie', token3)
    //         .expect(200)
    //         .expect("Content-Type", /json/)
    //         .expect((res) => {
    //             // all other requests failed automatically 
    //             expect(res.body[1].status).toBe('fail');
    //             expect(res.body[2].status).toBe('fail');
    //             expect(res.body[3].status).toBe('success'); // id = 4

    //         });
    // });

    // Now after the receiver changed his approval state, all senders will got a  notification
    test('should return notification after receiver changed his approval state', async () => {
        await request(app)
            .get("/api/v1/notifications/")
            .set('Cookie', token)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body[0].status).toBe('fail');
            });
    });

    // test('should return notification after receiver changed his approval state', async () => {
    //     await request(app)
    //         .get("/api/v1/notifications/")
    //         .set('Cookie', token2)
    //         .expect(200)
    //         .expect("Content-Type", /json/)
    //         .expect((res) => {
    //             expect(res.body[2].status).toBe('success');
    //             expect(res.body[2].receiver_approval).toBe(true);

    //         });
    // });
});
afterAll(() => sequelize.close());
