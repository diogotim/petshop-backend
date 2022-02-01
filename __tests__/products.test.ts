import { build } from "./helper";
import { productToAPIFormat } from "../src/lib/util";
import mock from "../mock";

const app = build();

test("products route returns a limited amount of products if the limit is not defined", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/products",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data.length).toBeLessThan(mock.length);
  expect(res.json().total).toEqual(mock.length);
});

test("products route allows a custom limit", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/products?limit=4",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data.length).toEqual(4);
});

test("products route allows an offset", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/products?offset=1",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data[0]).toEqual(productToAPIFormat(mock[1]));
});

test("products route allows both limit and offset", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/products?offset=1&limit=3",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data[0]).toEqual(productToAPIFormat(mock[1]));
  expect(res.json().data.length).toEqual(3);
});
