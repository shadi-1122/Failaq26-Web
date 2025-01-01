// Sidebar toggle functionality
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Close menu when clicking outside
function closeMenu() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Load the user data from localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Ensure user data is displayed
if (loggedInUser) {
    // Display user data
    document.getElementById('user-Name').textContent = loggedInUser.Username;
    document.getElementById('user-email').textContent = loggedInUser.adno;
    document.getElementById('user-Guardian').textContent = loggedInUser.Guardian;
    document.getElementById('user-fullname').textContent = loggedInUser.address;
    document.getElementById('user-dateofbirth').textContent = loggedInUser.dateofbirth;
    document.getElementById('user-bloodgroup').textContent = loggedInUser.bloodgroup;
    document.getElementById('user-phone').textContent = loggedInUser.phone;

    // Handle user photo
    const userPhoto = document.getElementById('user-photo');
    if (loggedInUser.Photo && loggedInUser.Photo.trim() !== '') {
        userPhoto.src = loggedInUser.Photo; // Use user's photo
    } else {
        userPhoto.src = 'photo/Unknown.png'; // Use default photo
    }
} else {
    window.location.href = 'https://failaq-users.vercel.app/'; // Redirect to login if not logged in
}

// Sidebar navigation logic
const links = document.querySelectorAll('.menu a');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));

        // Show the clicked page
        const targetId = link.id.replace('-link', '');
        document.getElementById(targetId).classList.add('active');

        // Close the menu after navigation
        closeMenu();
    });
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear(); // Clear session
    window.location.href = 'https://failaq-users.vercel.app/'; // Redirect to login
});

// Load Documents and Arts Fest data
fetch('users.json')
    .then(response => response.json())
    .then(users => {
        const currentUser = users.find(user => user.Username === loggedInUser.Username);
        if (currentUser) {
            if (currentUser.Documents) {
                loadDocuments(currentUser.Documents);
            }
            if (currentUser.ArtsFest) {
                loadArtsFest(currentUser.ArtsFest);
            }
        }
    })
    .catch(error => console.error('Error loading users:', error));

// Function to load documents
function loadDocuments(documents) {
    const documentsList = document.getElementById('documents-list');
    documents.forEach(doc => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${doc.title}</h3>
            <p>${doc.description}</p>
            <button onclick="viewDocument('${doc.pdf}')">Click Here</button>
        `;
        documentsList.appendChild(card);
    });
}

// Function to view a document
function viewDocument(pdfUrl) {
    window.open(pdfUrl, '_blank');
}

// Function to load Arts Fest documents
function loadArtsFest(artsFestDocuments) {
    const artsFestList = document.getElementById('arts-fest-list'); // Make sure this element exists in your HTML

    artsFestDocuments.forEach(doc => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${doc.title}</h3>
            <p>${doc.description}</p>
            <button onclick="viewArtsFestDocument('${doc.pdf}')">Click Here</button>
        `;
        artsFestList.appendChild(card);
    });
}

// Function to view an Arts Fest document
function viewArtsFestDocument(pdfUrl) {
    window.open(pdfUrl, '_blank');
}


function reload(){
    location.reload();
}

const d = new Date();
document.getElementById('year').innerHtml = d.getFullYear();
