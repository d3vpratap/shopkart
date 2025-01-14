document.getElementById('rzp-button').addEventListener('click', async function(e) {
    e.preventDefault();

    try {
        // Make a request to create an order on the server
        const response = await fetch('/create/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const {order ,currentUser} = await response.json();

        if (response.ok) {
            // Use the order details received from the server
            const options = {
                key: 'rzp_test_8Yy7ZIaVkNPkOy',  // Your Razorpay API Key (Test Mode)
                amount: order.amount*100,
                currency: order.currency,
                order_id: order.id,
                name: "Shopkart",
                description: "Test Transaction",
                image: "https://i.ibb.co/VwHPn0W/shopkart-Home.jpg",
                handler: function (response) {
                    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                    // You can send the response to the backend for verification and further processing
                },
                prefill: {
                    name: currentUser.name ,
                    email: currentUser.email,
                    contact: currentUser.contactNumber
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } else {
            console.error('Order creation failed:', order.error);
            alert('Failed to create order');
        }
    } catch (error) {
        console.log('Error:', error);
        alert('An error occurred while creating the order');
    }
});

