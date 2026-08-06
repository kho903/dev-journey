// Mission 5. Async Order Processing
function getProduct(productId) {
  // Promise 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (productId === 1) {
        resolve({
          id: 1,
          name: "Mechanical Keyboard",
          price: 120000,
          stock: 5,
        });
      } else {
        reject(new Error("Product not found"));
      }
    }, 400);
  });
}

function processPayment(amount, shouldFail) {
  // Promise 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        return reject(new Error("Payment failed"));
      }
      resolve({
        paymentId: "PAY-001",
        amount,
        status: "paid",
      });
    }, 600);
  });
}

function saveOrder(orderData) {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 101,
        ...orderData,
        status: "completed",
      });
    }, 300);
  });
}

function sendEmail(order) {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Email sent for order ${order.id}`);
    }, 500);
  });
}

function writeAuditLog(order) {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Audit saved for order ${order.id}`);
    }, 200);
  });
}

async function processOrder(productId, quantity, shouldPaymentFail) {
  // try-catch-finally 사용
  try {
    console.log("Order processing started");
    const product = await getProduct(productId);
    console.log(`Product loaded: ${product.name}`);
    if (quantity > product.stock) {
      throw new Error("Insufficient stock");
    }
    const totalPrice = product.price * quantity;
    const payment = await processPayment(totalPrice, shouldPaymentFail);
    console.log(`Payment completed: ${payment.paymentId}`);
    const order = await saveOrder({
      product,
      quantity,
      totalPrice,
      payment,
    });
    console.log(`Order saved: ${order.id}`);
    const emailPromise = sendEmail(order);
    const auditPromise = writeAuditLog(order);
    const [emailMessage, auditMessage] = await Promise.all([
      emailPromise,
      auditPromise,
    ]);
    console.log(emailMessage);
    console.log(auditMessage);
    const summary = {
      orderId: order.id,
      productName: product.name,
      quantity,
      totalPrice,
      status: order.status,
    };

    console.log(summary);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Order processing completed");
  }
}
async function main() {
  await processOrder(1, 2, false);
  await processOrder(1, 1, true);
  await processOrder(1, 10, false);
}

main();
