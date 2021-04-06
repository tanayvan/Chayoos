const { Order, ProductCart } = require("../models/order");
const stripe = require("stripe")("sk_test_3bxP4RwV3YadRUPFAI84xWoK00nSSCyvnW");
const uuid = require("uuid/v4");
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order Found in Db",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: `Failed To create a Order + ${err}`,
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find({ user: req.params.userId })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found",
        });
      }
      res.json(order);
    });
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update Order status",
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.makePayment = (req, res) => {
  const { product, token, amount } = req.body;
  console.log("Product", product);
  console.log("PRICE", product.price);
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product[0].name,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
