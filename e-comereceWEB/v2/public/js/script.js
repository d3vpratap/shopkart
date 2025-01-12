    // Wait until the page is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
        const loader = document.getElementById("loader");
        
        setTimeout(()=>{
            loader.setAttribute('background-image',URL('https://i.ibb.co/VwHPn0W/shopkart-Home.jpg'));
        })
        // Hide the loader after 2 seconds (adjust as needed)
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 1000);
    
        // Optionally, remove the loader when a specific event occurs
        window.addEventListener("load", () => {
            loader.classList.add("hidden");
        });
    });
    
    window.onload = () => {
        // Select all alert elements
        const alerts = document.querySelectorAll('.alert');

        // Loop through each alert and set a timer to remove it
        alerts.forEach(alert => {
            setTimeout(() => {
                alert.classList.add('fade'); // Add fade class for transition
                setTimeout(() => {
                    alert.remove(); // Remove the alert from DOM
                }, 1000); // Allow the fade transition to complete
            }, 3000); // Auto-remove after 3 seconds
        });
    };
    document.addEventListener('DOMContentLoaded', () => {
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('rating');
    
        stars.forEach(star => {
            // Highlight stars on hover
            star.addEventListener('mouseover', () => {
                const value = star.getAttribute('data-value');
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-value') <= value);
                });
            });
    
            // Reset stars on mouse out
            star.addEventListener('mouseout', () => {
                const currentRating = ratingInput.value;
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-value') <= currentRating);
                });
            });
    
            // Set the rating on click
            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                ratingInput.value = value;
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-value') <= value);
                });
            });
        });
    });
    
