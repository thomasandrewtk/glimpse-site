// This script handles the form submission using Formspree.

document.addEventListener('DOMContentLoaded', () => {
    // You can add more scripts here if needed.
    console.log('Glimpse site loaded');
    
    document.body.classList.add('loaded');
    
    // Add any analytics or tracking code here if needed

    const form = document.getElementById("my-form");
    const thankYouMessage = document.getElementById("thank-you");

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                form.style.display = "none";
                thankYouMessage.classList.remove("hidden");
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    alert(responseData["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form.");
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
}); 