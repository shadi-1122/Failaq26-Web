// Declare users globally
let users = [];

// Fetch the JSON file containing user data
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = Array.isArray(data) ? data : [];
        console.log("Users loaded:", users); // Debugging
    })
    .catch(error => {
        console.error("Error loading user data:", error);
    });

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Ensure users are loaded before processing login
    if (users.length === 0) {
        document.getElementById('error-message').textContent = 'User data not loaded yet. Please try again later.';
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find the user matching the credentials
    const user = users.find(u => u.Username === username && u.Password === password);

    if (user) {
        // Save user data to localStorage for use on the next page
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect to the user details page (parent dashboard)
        window.location.href = '/Dashboard/';
    } else {
        // Show error message if login fails
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});
