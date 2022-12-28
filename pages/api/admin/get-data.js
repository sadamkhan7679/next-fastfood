import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      const products = await Product.find();
      res.status(200).json({
        orders,
        products,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
