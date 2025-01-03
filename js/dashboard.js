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

let studentsData = [];

        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTOKS-Y5td-kgCqQVcLfFBqKp6EQlIwyVdogGlq2_pc7pQynVByOqF_RL-NJIOgcDI40yYdq2_geAyL/pub?output=csv')
            .then(response => response.text())
            .then(data => {
                parseCSVData(data);
            })
            .catch(error => {
                console.error('Error fetching CSV data:', error);
            });

        function parseCSVData(data) {
            const rows = data.split('\n');
            const headers = rows[0].split(',').map(header => header.trim());  

            console.log("Headers:", headers); 

            studentsData = rows.slice(1).map(row => {
                const columns = row.split(',').map(col => col.trim());  // Trim spaces from each column value
                const student = {};
                columns.forEach((col, index) => {
                    // Ensure headers are trimmed to avoid issues with extra spaces
                    student[headers[index]] = col;
                });
                return student;
            });

            console.log("Students Data:", studentsData);  // Log the student data to confirm
        }

        // Search for the student by ADNO and display the data
        function searchStudent() {
            const adno = document.getElementById('adno').value.trim();
            const student = studentsData.find(s => s.ADNO === adno);

            if (student) {
                document.getElementById('error-message').textContent = '';  // Clear error message
                displayStudentData(student);
                document.getElementById('result-section').style.display = "block"
            } else {
                document.getElementById('error-message').textContent = 'Student not found';
                document.getElementById('student-details').innerHTML = '';  // Clear previous data
                document.getElementById('result-section').style.display = "none"
            }
        }

        // Display the student's data in vertical table format
        function displayStudentData(student) {
            const container = document.getElementById('student-details');
            container.innerHTML = ''; // Clear any previous content

            // Extract the months' data and calculate total
            const months = [
                'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
            ];

            let total = 0;

            // Start building the table in a vertical format
            let tableHTML = `
                <table class="result-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Loop through each month and add the fee data in vertical rows
            months.forEach(month => {
                const monthValue = parseInt(student[month]) || 0;  // Parse as number or set to 0 if invalid
                total += monthValue;  // Add to total
                tableHTML += `
                    <tr>
                        <td>${month}</td>
                        <td>${monthValue}</td>
                    </tr>
                `;
            });

            // Add total row to the table
            tableHTML += `
                    <tr class="total-column">
                        <td><strong>Total</strong></td>
                        <td><strong>${total}</strong></td>
                    </tr>
                </tbody>
            </table>
            `;

            // Append the table to the container
            container.innerHTML = tableHTML;
        }
