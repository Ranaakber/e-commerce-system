let users = [];
let products = [];
let currentOrder = [];
let orders = [];

// User Class
class User {
    constructor(name) {
        this.name = name;
        this.orders = [];
    }

    addOrder(order) {
        this.orders.push(order);
    }
}

// Product Class
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Order Class
class Order {
    constructor(user) {
        this.user = user;
        this.products = [];
        this.status = "Pending";
    }

    addProduct(product) {
        this.products.push(product);
    }

    completeOrder() {
        this.status = "Completed";
    }
}

// Create a new user
function createUser() {
    const username = document.getElementById('username').value;
    if (username) {
        let user = new User(username);
        users.push(user);
        updateUserList();
        alert(`User ${username} created successfully!`);
    } else {
        alert('Please enter a username');
    }
}

// Add a new product
function addProduct() {
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    if (productName && productPrice) {
        let product = new Product(productName, parseFloat(productPrice));
        products.push(product);
        updateProductList();
        alert(`Product ${productName} added successfully!`);
    } else {
        alert('Please enter product details');
    }
}

// Update the user dropdown in the order section
function updateUserList() {
    const userSelect = document.getElementById('select-user');
    userSelect.innerHTML = "";
    users.forEach((user, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = user.name;
        userSelect.appendChild(option);
    });
}

// Update the product dropdown in the order section
function updateProductList() {
    const productSelect = document.getElementById('select-product');
    productSelect.innerHTML = "";
    products.forEach((product, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = `${product.name} ($${product.price})`;
        productSelect.appendChild(option);
    });
}

// Add product to the current order
function addProductToOrder() {
    const selectedProductIndex = document.getElementById('select-product').value;
    if (selectedProductIndex !== "") {
        const product = products[selectedProductIndex];
        currentOrder.push(product);
        alert(`${product.name} added to the current order`);
    } else {
        alert('Please select a product');
    }
}

// Create a new order
function createOrder() {
    const selectedUserIndex = document.getElementById('select-user').value;
    if (selectedUserIndex !== "" && currentOrder.length > 0) {
        let user = users[selectedUserIndex];
        let order = new Order(user);
        currentOrder.forEach(product => order.addProduct(product));
        user.addOrder(order);
        orders.push(order);
        currentOrder = [];
        alert('Order created successfully!');
    } else {
        alert('Please select a user and add products to the order');
    }
}

// View all orders
function viewOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = "";
    orders.forEach((order, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Order #${index + 1}</strong> - User: ${order.user.name}, Products: ${order.products.map(p => p.name).join(', ')}, Status: ${order.status}`;
        orderList.appendChild(listItem);
    });
}
