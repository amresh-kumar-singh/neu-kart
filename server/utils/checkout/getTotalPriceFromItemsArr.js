export default function (items) {
  if (!Array.isArray(items)) {
    throw new Error("Input must be and array to get total.");
  }

  const total = items.reduce((acc, item) => {
    const { quantity, price } = item;
    return acc + quantity * price;
  }, 0);

  return total;
}
