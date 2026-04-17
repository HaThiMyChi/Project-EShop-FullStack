"use strict";

async function addCart(id, quantity) {
  let res = await fetch("/products/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id, quantity }),
  });

  let json = await res.json();
  document.getElementById("cart-quantity").innerText = `(${json.quantity})`;
}

async function updateCart(id, quantity) {
  if (quantity > 0) {
    let res = await fetch("/products/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    });
    if (res.status === 200) {
      let json = await res.json();
      document.getElementById("cart-quantity").innerText = `(${json.quantity})`;
      document.getElementById("subtotal").innerHTML = `$${json.subtotal}`;
      document.getElementById("total").innerHTML = `$${json.total}`;
      document.getElementById(`total${id}`).innerHTML = `$${json.item.total}`;
    }
  } else {
    removeCart(id);
  }
}

async function removeCart(id) {
  if (confirm("Do you really want to remove this product?")) {
    let res = await fetch("/products/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.status === 200) {
      let json = await res.json();
      document.getElementById("cart-quantity").innerText = `(${json.quantity})`;

      if (json.quantity > 1) {
        document.getElementById("subtotal").innerHTML = `$${json.subtotal}`;
        document.getElementById("total").innerHTML = `$${json.total}`;
        document.getElementById(`product${id}`).remove();
      } else {
        document.querySelector(".cart-page .container").innerHTML = `
          <div class="text-center border py-3">
            <h3>Your cart is empty</h3>
          </div>
        `;
      }
    }
  }
}

async function clearCart() {
  if (confirm("Do you really want to clear all cart?")) {
    let res = await fetch("/products/cart/all", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res.status === 200) {
      document.getElementById("cart-quantity").innerText = `(0)`;

      document.querySelector(".cart-page .container").innerHTML = `
          <div class="text-center border py-3">
            <h3>Your cart is empty</h3>
          </div>
        `;
    }
  }
}

function placeorders(e) {
  // Ngăn chặn sự kiện submit của form
  e.preventDefault();

  const addressId = document.querySelector("input[name=addressId]:checked");
  if (!addressId || addressId.value == 0) {
    // Nếu như kiểm tra thấy lỗi thì gọi e.target.reportValidity() để hiển thị lỗi
    if (!e.target.checkValidity()) {
      return e.target.reportValidity();
    }
  }
  // neu như hợp lệ
  e.target.submit();
}

function checkPasswordConfirm(formId) {
  let password = document.querySelector(`#${formId} [name=password]`);
  let confirmPassword = document.querySelector(
    `#${formId} [name=confirmPassword]`,
  );

  if (password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords not match!"); // dat message loi cho input
    confirmPassword.reportValidity(); // hien thi loi ngay lap tuc
  } else {
    confirmPassword.setCustomValidity("");
  }
}
