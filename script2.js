// Toggle Sidebar for Mobile Navigation
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Show the Passkey Modal
function showPasskeyModal() {
    const modal = document.getElementById('passkeyModal');
    modal.style.display = 'block';
}

// Validate Passkey and Redirect to Dashboard if Successful
function validatePasskey() {
    const passkey = document.getElementById('passkeyInput').value;
    const errorMessage = document.getElementById('error-message');

    console.log(`Attempting login with passkey: ${passkey}`); // Log the passkey being sent

    fetch('https://iosx.onrender.com/login', { // Ensure the endpoint matches the one in your server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey })
    })
    .then(response => {
        console.log(`Response status: ${response.status}`); // Log the response status
        if (response.ok) {
            window.location.href = "index.html"; // Redirect to dashboard if passkey is correct
        } else {
            errorMessage.textContent = "Incorrect passkey. Please try again.";
        }
    })
    .catch(error => {
        console.error("Fetch error:", error); // Log any fetch errors
        errorMessage.textContent = "An error occurred. Please try again.";
    });
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('passkeyModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
