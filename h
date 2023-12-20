// Function to place an order
function placeOrder(userId) {
    // Retrieve user's cart
    const user = db.users.findOne({ _id: userId });
    const cartItems = user.cart.items;

    // Add cart items to the Orders collection
    db.orders.insertOne({
        userId: userId,
        products: cartItems,
        orderDate: new Date()
    });

    // Empty the user's cart
    db.users.updateOne({ _id: userId }, { $set: { "cart.items": [] } });
}
