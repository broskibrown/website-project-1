document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".navlink");
    const cartButton = document.querySelector(".cart-button");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const clearCartBtn = document.getElementById("clear-cart");
    const contactForm = document.getElementById("contact-form");
    const processCartBtn = document.getElementById("process-order");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    if (cartButton && cartOverlay) {
        cartButton.addEventListener("click", (e) => {
            e.preventDefault();
            renderCartFromStorage();
            cartOverlay.classList.add("active");
            cartOverlay.classList.remove("hidden");
        });

        closeCart.addEventListener("click", () => {
            cartOverlay.classList.remove("active");
            cartOverlay.classList.add("hidden");
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".gallery_card");
            const img = card.querySelector("img[data-name]");
            const name = img ? img.getAttribute("data-name") : "Unnamed Item";

            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            cart.push({ name });
            sessionStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        });
    });

    function renderCartFromStorage() {
        cartItemsList.innerHTML = "";
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
            return;
        }

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.name;
            cartItemsList.appendChild(li);
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            sessionStorage.removeItem("cart");
            renderCartFromStorage();

            alert(`Items cleared from cart!`);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !phone || !email || !message) {
                alert("Please fill out all required fields before submitting.");
                return;
            }

            const formData = {
                name,
                phone,
                email,
                message
            };

            localStorage.setItem("contactSubmission", JSON.stringify(formData));
            alert("Thank you for your message!");
            contactForm.reset();
        });
    }

    if (processCartBtn) {
        processCartBtn.addEventListener("click", () => {
            const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            if (cart.length === 0) {
                alert("Your cart is already empty!");
                return;
            }

            alert("Your order has been processed!");

            sessionStorage.removeItem("cart");
            renderCartFromStorage();

            processCartBtn.disabled = true;
            processCartBtn.textContent = "Order Processed";
        });
    }

});
