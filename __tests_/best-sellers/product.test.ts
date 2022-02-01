import { build } from "../helper";
import { productToAPIFormat } from "../../src/lib/util";
import mock from "../../mock";

const app = build();

test("product route returns a product", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/product/orange-ball",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data).toEqual(productToAPIFormat(mock[2]));
});

test("product route returns 404 if the product is not found", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/product/orange-abcdef",
  });

  expect(res.statusCode).toEqual(404);
});

test("product route returns 400 if the slug is not specified", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/product/",
  });

  expect(res.statusCode).toEqual(400);
});
