import request from "supertest";
import sequelize from "../server/database/connection";
import {app} from "../server/app";
import buildTables from "../server/database/build";
const token = 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJKZW5uaWVAZ21haWwuY29tIiwiaWF0IjoxNjY2Nzg5MDg4fQ.ayqLDkuNwgfbQZGd5spE1F0KbfxuAa_wPpkt34AKHN4'

beforeAll(() => buildTables());

describe('Check for filters /products/filter', () => {
  it('test the endpoint without any filter attatched', async () => {
    await request(app)
      .get('/api/v1/products/filter')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(2)
        expect(res.body.products[0]).toEqual({
          id: 1, title: 'nice sofa', gallery: [
            'https://apollo-singapore.akamaized.net/v1/files/sh0il57qfjfh3-IN/image;s=780x0;q=60 ',
            'https://apollo-singapore.akamaized.net/v1/files/zjt3gsd2oobm2-IN/image;s=780x0;q=60'
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with offset', async () => {
    await request(app)
      .get('/api/v1/products/filter?offset=1')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(2)
        expect(res.body.products[0]).toEqual({
          id: 7, title: 'Jacques Durand', gallery: [
            'https://cdn.rebelle.com//86/8649492_abd39855c1ac015cf78666200ee770f1.jpeg?width=514&height=510',
            'https://cdn.rebelle.com//86/8649492_7dbf8f148e0aa18b72c6f77298512ef8.jpeg?width=514&height=510',
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with cateogry', async () => {
    await request(app)
      .get('/api/v1/products/filter?category=2')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(1)
        expect(res.body.products[0]).toEqual({
          id: 1, title: 'nice sofa', gallery: [
            'https://apollo-singapore.akamaized.net/v1/files/sh0il57qfjfh3-IN/image;s=780x0;q=60 ',
            'https://apollo-singapore.akamaized.net/v1/files/zjt3gsd2oobm2-IN/image;s=780x0;q=60'
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with newest', async () => {
    await request(app)
      .get('/api/v1/products/filter?date=newest')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(2)
        expect(res.body.products[0]).toEqual({
          id: 1, title: 'nice sofa', gallery: [
            'https://apollo-singapore.akamaized.net/v1/files/sh0il57qfjfh3-IN/image;s=780x0;q=60 ',
            'https://apollo-singapore.akamaized.net/v1/files/zjt3gsd2oobm2-IN/image;s=780x0;q=60'
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with newest', async () => {
    await request(app)
      .get('/api/v1/products/filter?type=donation')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(1)
        expect(res.body.products[0]).toEqual({
          id: 1, title: 'nice sofa', gallery: [
            'https://apollo-singapore.akamaized.net/v1/files/sh0il57qfjfh3-IN/image;s=780x0;q=60 ',
            'https://apollo-singapore.akamaized.net/v1/files/zjt3gsd2oobm2-IN/image;s=780x0;q=60'
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with type=exchange', async () => {
    await request(app)
      .get('/api/v1/products/filter?type=exchange')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(1)
        expect(res.body.products[0]).toEqual({
          id: 3, title: 'White Charger', gallery: [
            "https://apollo-singapore.akamaized.net/v1/files/i6c5sdoqjous2-IN/image;s=780x0;q=60"
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with q=something', async () => {
    await request(app)
      .get('/api/v1/products/filter?q=something')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(1)
        expect(res.body.products[0]).toEqual({
          id: 2, title: 'something', gallery: [
            "https://apollo-singapore.akamaized.net/v1/files/hccwzehg6d8u-IN/image;s=1080x1080 "
          ]
        })
      })
  })
  it('test the endpoint without any filter attatched with q=wrongcase', async () => {
    await request(app)
      .get('/api/v1/products/filter?q=wrongcase')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(0)
        expect(res.body.products.length).toBe(0)
      })
  })
  it('if all filters is right', async () => {
    await request(app)
      .get('/api/v1/products/filter?offset=0&limit=3&date=oldest&type=donation&q=something')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.totalPages).toBe(1)
        expect(res.body.products[0]).toEqual({
          id: 2,
          title: "something",
          gallery: [
            "https://apollo-singapore.akamaized.net/v1/files/hccwzehg6d8u-IN/image;s=1080x1080 "
          ]
        })
      })
  })
})

describe("Product route must be returned the details of product according to the given id", () => {
  test("must return json file contains product info ", async () => {
    await request(app)
      .get("/api/v1/products/8")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.id).toBe(8);
        expect(res.body.title).toBe(
          "Louis Vuitton Jacques Durand Sunglasses Black Sunglasses"
        );
        expect(res.body.description).toBe(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
        );
        expect(res.body["Category.name"]).toBe("Accessories");
        expect(res.body.user_id).toBe(5);
      });
  });

  test("must returns product doesn't exist anymore for invalid id", async () => {
    await request(app)
      .get("/api/v1/products/70")
      .expect(404)
      .expect("Content-Type", /json/)
      .expect({
        message: "This item doesn't exist anymore",
      });
  });

  test("must returns product doesn't exist anymore for invalid id", async () => {
    await request(app)
      .get("/api/v1/products/something")
      .expect(401)
      .expect("Content-Type", /json/)
      .expect({
        message: "Bad Request",
      });
  });
});

// DELETE
describe("deleting a product DELETE api/v1/products/:productId", () => {
  test('testing deleting a product when there\'s no token', async () => {
    await request(app)
      .delete('/api/v1/products/1')
      .expect(401)
      .expect({
        message: 'Unauthorized'
      })
  })

  test('testing deleting a product when the token is played with', async () => {
    await request(app)
      .delete('/api/v1/products/1')
      .set('Cookie', `${token}a`)
      .expect(401)
      .expect({
        message: 'Unauthorized'
      })
  })

  test('testing deleting a product when there\'s a token', async () => {
    await request(app)
      .delete('/api/v1/products/1')
      .set('Cookie', token)
      .expect(200)
      .expect({
        message: "Product deleted successfully"
      })
  })

  test('testing deleting a product for an invalid id', async () => {
    await request(app)
      .delete('/api/v1/products/-1')
      .set('Cookie', token)
      .expect(400)
      .expect({
        message: "Bad Request"
      })
  })

  test('testing deleting a product for an invalid id', async () => {
    await request(app)
      .delete('/api/v1/products/aa')
      .set('Cookie', token)
      .expect(400)
      .expect({
        message: "Bad Request"
      })
  })

  test('testing deleting an already deleted product', async () => {
    await request(app)
      .delete('/api/v1/products/1')
      .set('Cookie', token)
      .expect(400)
      .expect({
        message: "Bad Request"
      })
  })
})


describe("deleting a product PUT api/v1/products/:productId", () => {

  test('testing updating a product for an invalid id', async () => {
    await request(app)
      .put('/api/v1/products/-1')
      .set('Cookie', token)
      .send({
        title: "lorem",
        description: "lorem ipsum batikh"
      })
      .expect(400)
      .expect({
        message: "\"id\" must be greater than or equal to 1"
      })
  })

  test('testing updating a product for an invalid id', async () => {
    await request(app)
      .put('/api/v1/products/kfh')
      .set('Cookie', token)
      .send({
        title: "lorem",
        description: "lorem ipsum batikh"
      })
      .expect(400)
      .expect({
        message: "\"id\" must be a number"
      })
  })

  test('testing updating a product for an id that doesn\'t exist', async () => {
    await request(app)
      .put('/api/v1/products/200')
      .set('Cookie', token)
      .send({
        title: "lorem",
        description: "lorem ipsum batikh"
      })
      .expect(400)
      .expect({
        message: "Bad Request, id doesn't exist"
      })
  })

  test('testing updating a product for an id that doesn\'t exist', async () => {
    await request(app)
      .put('/api/v1/products/1')
      .set('Cookie', token)
      .send({
        title: "lorem",
        description: "lorem ipsum batikh"
      })
      .expect(400)
      .expect({
        message: "Bad Request, id doesn't exist"
      });
  });


  test('testing updating a product for a valid id', async () => {
    await request(app)
      .put('/api/v1/products/5')
      .set('Cookie', token)
      .send({
        title: "lorem",
        description: "lorem ipsum batikh"
      })
      .expect(200)
      .expect({
        message: "You updated your product successfully"
      });
  });

  test('testing adding new product, should return 400 when added invalid type', async () => {
    await request(app)
      .post('/api/v1/products/')
      .set('Cookie', token)
      .send({
        "title": "new title",
        "description": "new product",
        "type": "kkkk",
        "gallery": [
          "https://apollo-singapore.akamaized.net/v1/files/i6c5sdoqjous2-IN/image;s=780x0;q=60"
        ],
        "category_id": 1
      })
      .expect(400)
      .expect({
        "message": "\"type\" must be one of [donation, exchange]"
      });
  });

  test('testing adding a new product when the user added a valid inputs', async () => {
    await request(app)
      .post('/api/v1/products/')
      .set('Cookie', token)
      .send({
        "title": "new title",
        "description": "new product",
        "type": "donation",
        "gallery": [
          "https://apollo-singapore.akamaized.net/v1/files/i6c5sdoqjous2-IN/image;s=780x0;q=60"
        ],
        "category_id": 1
      })
      .expect(201)
      .expect({
        "message": "You successfully posted a product"
      });
  });

  test('testing adding a new product when the user added a valid inputs', async () => {
    await request(app)
      .post('/api/v1/products/')
      .set('Cookie', token)
      .send({
        "title": "new title",
        "description": "new product",
        "type": "exchange",
        "gallery": [
          "https://apollo-singapore.akamaized.net/v1/files/i6c5sdoqjous2-IN/image;s=780x0;q=60"
        ],
        "category_id": 1
      })
      .expect(201)
      .expect({
        "message": "You successfully posted a product"
      });
  });
});


afterAll(() => sequelize.close());
