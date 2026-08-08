// Practice 2. Product Data Transformation
const products = [
  {
    id: 1,
    name: "  keyboard  ",
    price: 120000,
    stock: 5,
    active: true,
    category: "device",
  },
  {
    id: 2,
    name: "mouse",
    price: 50000,
    stock: 0,
    active: true,
    category: "device",
  },
  {
    id: 3,
    name: "  monitor ",
    price: 300000,
    stock: 3,
    active: false,
    category: "device",
  },
  {
    id: 4,
    name: "usb cable ",
    price: 15000,
    stock: 10,
    active: true,
    category: "accessory",
  },
  {
    id: 5,
    name: " laptop stand ",
    price: 45000,
    stock: 4,
    active: true,
    category: "accessory",
  },
];

function getAvailableProducts(products) {
  return products.filter((product) => product.active && product.stock > 0);
}

function normalizeProducts(products) {
  return products.map((product) => ({
    ...product,
    name: product.name.trim().toUpperCase(),
    category: product.category.toUpperCase(),
  }));
}

function createProductSummaries(products) {
  return products.map(({ active, price, stock, ...product }) => ({
    ...product,
    price,
    inventoryValue: price * stock,
  }));
}

function calculateTotalInventoryValue(products) {
  return products.reduce((acc, cur) => acc + cur.inventoryValue, 0);
}

function createCategorySummary(products) {
  return products.reduce((acc, cur) => {
    const category = cur.category;
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {});
}

function processProducts(products) {
  const availableProducts = getAvailableProducts(products);
  const normalizedProducts = normalizeProducts(availableProducts);
  const productSummaries = createProductSummaries(normalizedProducts);
  const totalInventoryValue = calculateTotalInventoryValue(productSummaries);
  const categorySummary = createCategorySummary(productSummaries);

  return {
    products: productSummaries,
    totalInventoryValue,
    categorySummary,
  };
}

const result = processProducts(products);

console.log(result);
