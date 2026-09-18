function addToCart() {

    alert("Product added to cart!");

}


function submitForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        "Thank you " +
        name +
        "! Your message has been submitted."
    );

}
```javascript
/* =========================================
   COPY COUPON CODE
========================================= */

function copyCoupon(code, button) {

    navigator.clipboard.writeText(code)
        .then(function () {

            const originalText = button.innerText;

            button.innerText = "Copied!";

            setTimeout(function () {

                button.innerText = originalText;

            }, 2000);

        })
        .catch(function () {

            alert("Coupon Code: " + code);

        });

}
```

