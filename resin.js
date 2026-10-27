
const products = [
    {
        id: 1,
        name: "Floral Resin Frame",
        category: "Frames",
        price: 899,
        image: "https://tse4.mm.bing.net/th/id/OIP.YuNqBhq7OQezkaRrRXiuBgHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3"
    },
    {
        id: 2,
        name: "Heart Resin Keychain",
        category: "Keychains",
        price: 199,
        image: "https://i.pinimg.com/originals/b9/71/d1/b971d1afe2bbd959a516966f9d019866.jpg"
    },
    {
        id: 3,
        name: "Flower Earrings",
        category: "Earrings",
        price: 299,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Resin Bracelet",
        category: "Bracelets",
        price: 349,
        image: "https://tse4.mm.bing.net/th/id/OIP.4bXkDDWgV6l89ZizLz1ifwHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 5,
        name: "Designer Resin Clock",
        category: "Clocks",
        price: 1499,
        image: "https://tse2.mm.bing.net/th/id/OIP.WfZSWWZt-_1sXJSHe2J4LQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 6,
        name: "Memory Photo Frame",
        category: "Frames",
        price: 699,
        image: "https://tse1.mm.bing.net/th/id/OIP.i3BmMICuV-6_9vnx1oITLwHaIR?r=0&pid=ImgDet&w=184&h=204&c=7&dpr=1.3&o=7&rm=3"
    },
    {
        id: 7,
        name: "Personalized Keychain",
        category: "Keychains",
        price: 249,
        image: "https://th.bing.com/th/id/OIP.dtyLg620cTPXN-oON4-NrAHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 8,
        name: "Pearl Earrings",
        category: "Earrings",
        price: 399,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Colorful Bracelet",
        category: "Bracelets",
        price: 279,
        image: "https://tse4.mm.bing.net/th/id/OIP.wmzVLmyYNG_WPBeaSMzFFQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 10,
        name: "Ocean Resin Clock",
        category: "Clocks",
        price: 1899,
        image: "https://th.bing.com/th/id/OIP.19u_JqIaKCIkFTrRljvgfAHaJ4?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

let cart = [];
let couponApplied = false;

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");

function displayProducts() {
    let filteredProducts = [...products];

    const searchText = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const category =
        document.getElementById("categoryFilter").value;

    const sort =
        document.getElementById("sortSelect").value;

    filteredProducts = filteredProducts.filter(function(product) {
        const matchesName =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesName && matchesCategory;
    });

   
    if (sort === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.innerHTML =
            '<p class="empty-message">No products found.</p>';
        return;
    }

    
    filteredProducts.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="price">₹${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(card);
    });
}


function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-message">Your cart is empty. Add a product!</p>';
    }

    cart.forEach(function(item) {
        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <p>₹${item.price.toFixed(2)} each</p>
            </div>

            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>

            <strong>
                ₹${(item.price * item.quantity).toFixed(2)}
            </strong>

            <button class="remove-button"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(row);
    });

   
    const subtotalValue = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    
    const discountValue = couponApplied
        ? subtotalValue * 0.10
        : 0;

    const totalValue = subtotalValue - discountValue;

    
    const totalQuantity = cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);

    document.getElementById("subtotal").textContent =
        "₹" + subtotalValue.toFixed(2);

    document.getElementById("discount").textContent =
        "₹" + discountValue.toFixed(2);

    document.getElementById("total").textContent =
        "₹" + totalValue.toFixed(2);

    document.getElementById("cartCount").textContent =
        totalQuantity;

    if (subtotalValue === 0) {
        couponApplied = false;
        document.getElementById("discount").textContent = "₹0.00";
    }
}


document.getElementById("applyCoupon").addEventListener("click", function() {
    const coupon = document
        .getElementById("couponInput")
        .value.trim().toUpperCase();

    const message = document.getElementById("couponMessage");

    const subtotalValue = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    if (subtotalValue === 0) {
        couponApplied = false;
        message.textContent = "Please add products to your cart first.";
        message.style.color = "red";
    } else if (coupon === "SAVE10") {
        couponApplied = true;
        message.textContent = "Coupon applied! You saved 10%.";
        message.style.color = "green";
    } else {
        couponApplied = false;
        message.textContent = "Invalid coupon. Try SAVE10.";
        message.style.color = "red";
    }

    updateCart();
});


document.getElementById("cartButton").addEventListener("click", function() {
    document.getElementById("cartSection").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("checkoutButton").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    const total = document.getElementById("total").textContent;

    alert(
        "Order placed successfully!\n" +
        "Your total is " + total + "\n" +
        "Thank you for shopping with us!"
    );

    cart = [];
    couponApplied = false;

    document.getElementById("couponInput").value = "";
    document.getElementById("couponMessage").textContent = "";

    updateCart();
});


document.getElementById("searchInput")
    .addEventListener("input", displayProducts);

document.getElementById("categoryFilter")
    .addEventListener("change", displayProducts);

document.getElementById("sortSelect")
    .addEventListener("change", displayProducts);

displayProducts();
updateCart();
