import { FastifyInstance, FastifyRequest } from "fastify";
import mock from "../../../../mock";
import { productToAPIFormat } from "../../../lib/util";

interface Query {
  offset: number | undefined;
  limit: number | undefined;
}

const products = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/products",
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer" },
          offset: { type: "integer" },
        },
      },
    },
    handler: (req: FastifyRequest<{ Querystring: Query }>, reply) => {
      const offset = req.query.offset || 0;
      const limit = req.query.limit || 5;
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          total: mock.length,
          data: mock
            .slice(offset, offset + limit)
            .map((p) => productToAPIFormat(p)),
        });
    },
  });
};

export default products;
