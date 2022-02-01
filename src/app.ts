import fastify, { FastifyInstance } from "fastify";
import path from "path";
import helmet from "fastify-helmet";
import products from "./routes/v1/products/products";
import product from "./routes/v1/product/product";
import bestSellers from "./routes/v1/best-sellers/best-sellers";
import fastifyStatic from "fastify-static";

const build = (): FastifyInstance => {
  const app = fastify();
  app.register(helmet);
  app.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
  });
  app.register(products, { prefix: "/v1" });
  app.register(bestSellers, { prefix: "/v1" });
  app.register(product, { prefix: "/v1" });
  return app;
};

export default build;
