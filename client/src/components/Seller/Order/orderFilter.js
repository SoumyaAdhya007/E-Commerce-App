// Assuming you have an array of order objects
const orders = [
  // Insert your order objects here
];

// Define a function to filter orders
function filterOrders(date, status) {
  // Filter by date and status
  const filteredOrders = orders.filter((order) => {
    // Check if the date matches (if provided)
    const dateMatch =
      !date ||
      new Date(order.orderDate).toDateString() ===
        new Date(date).toDateString();

    // Check if the status matches (if provided)
    const statusMatch = !status || order.status === status;

    // Return true if both conditions are met
    return dateMatch && statusMatch;
  });

  return filteredOrders;
}

// Example usage:
const filteredOrders = filterOrders("2023-10-06T12:00", "processing");
console.log(filteredOrders);
