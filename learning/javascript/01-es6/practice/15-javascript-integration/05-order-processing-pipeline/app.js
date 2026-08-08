// Practice 5. Order Processing Pipeline
const products = [
  {
    id: 1,
    name: "Keyboard",
    price: 120000,
    stock: 5,
  },
  {
    id: 2,
    name: "Mouse",
    price: 50000,
    stock: 10,
  },
  {
    id: 3,
    name: "Monitor",
    price: 300000,
    stock: 2,
  },
];

function validateOrder(order) {
  if (
    order === null ||
    typeof order !== "object" ||
    typeof order.productId !== "number" ||
    typeof order.quantity !== "number" ||
    order.quantity < 1
  ) {
    throw new Error("Invalid order");
  }

  return true;
}
function findProduct(products, productId) {
  const product = products.find((product) => product.id === productId);
  if (!product) throw new Error("Product not found");
  return product;
}

function validateStock(product, quantity) {
  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }
  return true;
}

function createOrderSummary(product, quantity) {
  return {
    productId: product.id,
    productName: product.name.toUpperCase(),
    quantity,
    unitPrice: product.price,
    totalPrice: product.price * quantity,
  };
}

function processPayment(totalPrice, shouldFail) {
  // Promise 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail
        ? reject(new Error("Payment failed"))
        : resolve({
            paymentId: "PAY-001",
            amount: totalPrice,
            status: "paid",
          });
    }, 500);
  });
}

function saveOrder(orderSummary, payment) {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: 101,
        ...orderSummary,
        paymentId: payment.paymentId,
        status: "completed",
      });
    }, 300);
  });
}

async function processOrder(order, shouldPaymentFail) {
  try {
    validateOrder(order);
    const product = findProduct(products, order.productId);
    validateStock(product, order.quantity);
    const summary = createOrderSummary(product, order.quantity);

    const payment = await processPayment(summary.totalPrice, shouldPaymentFail);
    console.log(`Payment completed: ${payment.paymentId}`);
    const savedOrder = await saveOrder(summary, payment);
    console.log(savedOrder);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Order processing completed");
  }
}

async function main() {
  await processOrder(
    {
      productId: 1,
      quantity: 2,
    },
    false,
  );

  await processOrder(
    {
      productId: 3,
      quantity: 5,
    },
    false,
  );

  await processOrder(
    {
      productId: 2,
      quantity: 1,
    },
    true,
  );
}

main();
