import { build } from "../helper";

const app = build();

test("best-sellers route", async () => {
  const res = await app.inject({
    method: "GET",
    url: "v1/best-sellers",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data.length).toEqual(5);
});
