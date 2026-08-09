// Mission 2. Order Report Service
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 120000,
  },
  {
    id: 2,
    name: "Mouse",
    price: 50000,
  },
  {
    id: 3,
    name: "Monitor",
    price: 300000,
  },
];

const orders = [
  {
    id: 101,
    productId: 1,
    quantity: 2,
    status: "completed",
  },
  {
    id: 102,
    productId: 2,
    quantity: 3,
    status: "completed",
  },
  {
    id: 103,
    productId: 3,
    quantity: 1,
    status: "cancelled",
  },
  {
    id: 104,
    productId: 1,
    quantity: 1,
    status: "completed",
  },
];

function validateOrders(orders) {
  if (!Array.isArray(orders)) throw new Error("Invalid orders");
  if (orders.length === 0) throw new Error("Orders cannot be empty");

  return true;
}

function getCompletedOrders(orders) {
  return orders.filter((order) => order.status === "completed");
}
function createOrderDetails(orders, products) {
  return orders.map((order) => {
    const product = products.find((product) => product.id === order.productId);

    if (!product) {
      throw new Error(`Product not found: ${order.productId}`);
    }

    return {
      orderId: order.id,
      productId: product.id,
      productName: product.name.toUpperCase(),
      quantity: order.quantity,
      unitPrice: product.price,
      totalPrice: product.price * order.quantity,
    };
  });
}

function createProductSalesSummary(orderDetails) {
  return orderDetails.reduce((summary, detail) => {
    const { productName, quantity, totalPrice } = detail;
    if (!summary[productName]) {
      summary[productName] = {
        quantity: 0,
        sales: 0,
      };
    }
    summary[productName].quantity += quantity;
    summary[productName].sales += totalPrice;
    return summary;
  }, {});
}

function createOrderReport(orderDetails) {
  const orderCount = orderDetails.length;
  const totalQuantity = orderDetails.reduce(
    (acc, cur) => acc + cur.quantity,
    0,
  );
  const totalSales = orderDetails.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const averageOrderAmount = orderCount === 0 ? 0 : totalSales / orderCount;
  return {
    orderCount,
    totalQuantity,
    totalSales,
    averageOrderAmount,
  };
}

function processOrderReport(orders, products) {
  try {
    validateOrders(orders);
    const completedOrders = getCompletedOrders(orders);
    const orderDetails = createOrderDetails(completedOrders, products);
    console.log(orderDetails);
    const productSalesSummary = createProductSalesSummary(orderDetails);
    console.log(productSalesSummary);
    const report = createOrderReport(orderDetails);
    console.log(report);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Order report processing completed");
  }
}
processOrderReport(orders, products);
