import { FastifyInstance, FastifyRequest } from "fastify";
import mock from "../../../../mock";
import { productToAPIFormat } from "../../../lib/util";

interface Params {
  slug: string | undefined;
}

const product = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/product/:slug",
    handler: (req: FastifyRequest<{ Params: Params }>, reply) => {
      const slug = req.params.slug;
      if (!slug) {
        reply
          .code(400)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ message: "Specify the slug of a product" });
        return;
      }

      const prod = mock.find(
        (p) => slug.replace(/-/g, " ") === p.name.toLowerCase()
      );

      if (!prod) {
        reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ message: "Product not found" });
        return;
      }

      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          data: productToAPIFormat(prod),
        });
    },
  });
};

export default product;
