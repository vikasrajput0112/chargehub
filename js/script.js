```javascript
/* =========================================
   BUY PRODUCT
========================================= */

function buyProduct(productName) {

    alert(
        "You selected: " +
        productName
    );

}


/* =========================================
   COPY COUPON CODE
========================================= */

function copyCoupon(code, button) {

    navigator.clipboard.writeText(code)

        .then(function () {

            const originalText =
                button.innerText;


            button.innerText =
                "Copied!";


            setTimeout(function () {

                button.innerText =
                    originalText;

            }, 2000);

        })


        .catch(function () {

            alert(
                "Coupon Code: " +
                code
            );

        });

}
