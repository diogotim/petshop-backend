import { FastifyInstance } from "fastify";
import mock from "../../../../mock";
import { productToAPIFormat } from "../../../lib/util";

const bestSellers = async (fastify: FastifyInstance) => {
  fastify.get("/best-sellers", (req, reply) => {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        data: mock
          .sort((a, b) => (a.sold > b.sold ? -1 : 1))
          .slice(0, 5)
          .map((p) => productToAPIFormat(p)),
      });
  });
};

export default bestSellers;
