
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}


function closeMenu() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}


const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


if (loggedInUser) {
    
    document.getElementById('user-Name').textContent = loggedInUser.Username;
    document.getElementById('user-email').textContent = loggedInUser.adno;
    document.getElementById('user-Guardian').textContent = loggedInUser.Guardian;
    document.getElementById('user-fullname').textContent = loggedInUser.address;
    document.getElementById('user-dateofbirth').textContent = loggedInUser.dateofbirth;
    document.getElementById('user-bloodgroup').textContent = loggedInUser.bloodgroup;
    document.getElementById('user-phone').textContent = loggedInUser.phone;

    const userPhot = document.getElementById('user-phot');
    const userPhoto = document.getElementById('user-photo');
    if (loggedInUser.Photo && loggedInUser.Photo.trim() !== '') {
        userPhot.src = loggedInUser.Photo; 
    } else {
        userPhot.src = 'photo/Unknown.png'; 
    }
    if (loggedInUser.Photo && loggedInUser.Photo.trim() !== '') {
        userPhoto.src = loggedInUser.Photo; 
    } else {
        userPhoto.src = 'photo/Unknown.png'; 
    }
} else {
    window.location.href = 'index.html'; 
}

const ad = "Shahin Shadi CK"

if (loggedInUser.Username == ad){
    document.getElementById('me').innerHTML = "ADMIN"
    document.getElementById('entry-link').style.display = "flex"
}


const links = document.querySelectorAll('.menu a');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        
        pages.forEach(page => page.classList.remove('active'));
        links.forEach(item => item.classList.remove('active'));

        this.classList.add('active');
        
        
        const targetId = link.id.replace('-link', '');
        document.getElementById(targetId).classList.add('active');

        
        closeMenu();
    });
});




document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear(); 
    window.location.href = 'index.html'; 
});


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


function viewDocument(pdfUrl) {
    window.open(pdfUrl, '_blank');
}


function loadArtsFest(artsFestDocuments) {
    const artsFestList = document.getElementById('arts-fest-list'); 
    
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
                const columns = row.split(',').map(col => col.trim());  
                const student = {};
                columns.forEach((col, index) => {
                    
                    student[headers[index]] = col;
                });
                return student;
            });

            console.log("Students Data:", studentsData);  
        }
        
        
        function searchStudent() {
            const adno = document.getElementById('adno').value.trim();
            const addno = document.getElementById('adno');
            const student = studentsData.find(s => s.ADNO === adno);

            if (student) {
                document.getElementById('error-message').textContent = '';  
                displayStudentData(student);
                document.getElementById('result-section').style.display = "block"
            } else {
                document.getElementById('error-message').textContent = 'Student not found';
                document.getElementById('student-details').innerHTML = '';  
                document.getElementById('result-section').style.display = "none"
            }
        }

        
        function displayStudentData(student) {
            const container = document.getElementById('student-details');
            container.innerHTML = ''; 
            
            
            const months = [
                'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER','TO PAY'
            ];

            let total = 0;

            
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

            
            months.forEach(month => {
                const monthValue = parseInt(student[month]) || 0;  
                total += monthValue;  
                tableHTML += `
                <tr>
                        <td>${month}</td>
                        <td>${monthValue}</td>
                    </tr>
                `;
            });

            
            tableHTML += `
            <tr class="total-column">
                        <td><strong>Total</strong></td>
                        <td><strong>${total}</strong></td>
                    </tr>
                </tbody>
            </table>
            `;

            
            container.innerHTML = tableHTML;
        }

        let number = document.getElementById('number1');
        let targetElement5 = document.getElementById('number1')
        let counter = 0;
        let targetValue5 = parseInt(targetElement5.innerHTML, 10)
        let intervalId5 = setInterval(() => {
            if(counter >=targetValue5){
                clearInterval(intervalId5);
            }else{
                counter += 1;
                number.innerHTML = counter + "%"
            }
        }, 21.5);

        let mark = document.getElementById('mark1');
        let targetElement4 = document.getElementById('mark1')
        let count = 0;
        let targetValue4 = parseInt(targetElement4.innerHTML, 10)
        let intervalId4 = setInterval(()=>{
            if(count >=targetValue4){
                clearInterval(intervalId4);
            }else{
                count += 3;
                mark.innerHTML = count 
            }
        },3)


        let number1 = document.getElementById('number2');
        let targetElement3 = document.getElementById('number2');
        let counter1 = 0;
        let targetValue3 = parseInt(targetElement3.innerHTML, 10)
        let intervalId3 = setInterval(() => {
            if(counter1 >=targetValue3){
                clearInterval(intervalId3);
            }else{
                counter1 += 1;
                number1.innerHTML = counter1 + "%"
            }
        }, 21.5);

        let mark1 = document.getElementById('mark2');
        let targetElement2 = document.getElementById('mark2')
        let count1 = 0;
        let targetValue2 = parseInt(targetElement2.innerHTML, 10)
        let intervalId2 = setInterval(()=>{
            if(count1 >=targetValue2){
                clearInterval(intervalId2);
            }else{
                count1 += 4;
                mark1.innerHTML = count1 
            }
        },5)

        let number2 = document.getElementById('number3');
        let targetElement1 = document.getElementById('number3');
        let counter2 = 0;
        let targetValue1 = parseInt(targetElement1.innerHTML, 10)
        let intervalId1 = setInterval(() => {
            if(counter2 >=targetValue1){
                clearInterval(intervalId1);
            }else{
                counter2 += 1;
                number2.innerHTML = counter2 + "%"
            }
        }, 21.5);
        
        let mark2 = document.getElementById('mark3'); 
        let targetElement = document.getElementById('mark3'); 
        let count2 = 0;
        let targetValue = parseInt(targetElement.innerHTML, 10);
        let intervalId = setInterval(() => {
            if (count2 >= targetValue) {
                clearInterval(intervalId); 
            } else {
                count2 += 4;
                mark2.innerHTML = count2;
            }
        }, 5);

        const track = document.querySelector('.carousel-track');
        const items = Array.from(track.children);
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');

        // Clone the first and last items for seamless transition
        const firstClone = items[0].cloneNode(true);
        const lastClone = items[items.length - 1].cloneNode(true);

        track.appendChild(firstClone);
        track.insertBefore(lastClone, items[0]);

        const updatedItems = Array.from(track.children);
        const totalItems = updatedItems.length;

        let currentIndex = 1;
        const itemWidth = items[0].getBoundingClientRect().width;

        // Initial positioning
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        function updateCarousel() {
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }

        function checkLoop() {
            if (currentIndex === 0) {
                track.style.transition = 'none'; // Disable transition for seamless loop
                currentIndex = items.length;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            } else if (currentIndex === totalItems - 1) {
                track.style.transition = 'none'; // Disable transition for seamless loop
                currentIndex = 1;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }
        }

        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
            setTimeout(checkLoop, 500);
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
            setTimeout(checkLoop, 500);
        });

        // Auto-slide every 3 seconds
        setInterval(() => {
            currentIndex++;
            updateCarousel();
            setTimeout(checkLoop, 500);
        }, 3000);

        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            track.style.transform = `translateX(-${currentIndex * items[0].getBoundingClientRect().width}px)`;
        });

        

        const sibaq = document.getElementById('sibaq');
        const sbq = document.getElementById('sbq')

        if(window.innerWidth<=530){
            sibaq.style.display = 'block'
            sbq.style.display = 'block'
        }else{
            sibaq.style.display = 'none'
            sbq.style.display = 'none'
        }

        const menuIcon = document.getElementById('user-phot');
        const menu = document.getElementById('small');
        const ovrl = document.getElementById('ovrl');
        const sml = document.getElementById('sml');
        const prf = document.getElementById('profile-link');
        const svpr = document.getElementById('svpr')
        function imgT(){
            menu.classList.toggle('active');
            ovrl.classList.toggle('active');
            menuIcon.style.border = "1px solid #8a3324";
            if(prf.classList.contains('active')){
                sml.classList.add('active')
            }else{
                sml.classList.remove('active')
            }

            if(sml.classList.contains('active')){
                svpr.classList.add('active')
            }else{
                svpr.classList.remove('active')
            }
        }


        function imgC(){
            document.getElementById('small').classList.remove('active')
            document.getElementById('ovrl').classList.remove('active')
        }

        const pass = document.getElementById('chngps')
        const sh = document.getElementById('details')

        function pas(){
            sh.classList.toggle('active')
        }

        const GITHUB_TOKEN = "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"; // Replace with your token
        const REPO_OWNER = "shadi-1122";
        const REPO_NAME = "Failaq26-Web";
        const FILE_PATH = "users.json";
        const BRANCH = "main";

        // Fetch JSON data
        async function fetchJSON() {
            const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${FILE_PATH}`);
            return response.json();
        }

        // Toggle details visibility
        function toggleDetails() {
            const details = document.getElementById('details');
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
            document.getElementById('error-message').textContent = '';
            document.getElementById('success-message').textContent = '';
        }

        // Cancel edit
        function cancelEdit() {
            document.getElementById('details').style.display = 'none';
        }


       


        // Save password
        async function savePassword() {
            const previousPassword = document.getElementById('previous-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            const errorMessage = document.getElementById('error-message');
            const successMessage = document.getElementById('success-message');
            errorMessage.textContent = '';
            successMessage.textContent = '';

            const jsonData = await fetchJSON();
            let userFound = false;

            // Search for the user with matching previous password
            for (let user of jsonData) {
                if (String(user.Password) === previousPassword) {
                    // If the previous password matches, update the password
                    user.Password = newPassword;
                    userFound = true;
                    break;
                }
            }

            if (!userFound) {
                errorMessage.textContent = 'Previous password is incorrect.';
                return;
            }

            // Validate New Password
            if (newPassword !== confirmPassword) {
                errorMessage.textContent = 'New password and confirmation do not match.';
                return;
            }

            if (!newPassword.trim()) {
                errorMessage.textContent = 'New password cannot be empty.';
                return;
            }

            // Update JSON file on GitHub
            const fileSHA = await getFileSHA();
            await updateJSONOnGitHub(jsonData, fileSHA);

            successMessage.textContent = 'Password changed successfully!';
        }

        // Get file SHA
        async function getFileSHA() {
            const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
                headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
            });
            const data = await response.json();
            return data.sha;
        }

        // Update JSON on GitHub
        async function updateJSONOnGitHub(newData, fileSHA) {
            const updatedContent = btoa(JSON.stringify(newData, null, 2)); // Encode JSON to Base64
            await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Update JSON data',
                    content: updatedContent,
                    sha: fileSHA,
                    branch: BRANCH,
                }),
            });
        }

        document.getElementById("form").addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the default form submission
            document.getElementById("message").textContent = "Adding..";
            document.getElementById("message").style.display = "block";
            document.getElementById("submit-button").disabled = true;
            
            // Collect the form data
            var formData = new FormData(this);
            var keyValuePairs = [];
            for (var pair of formData.entries()) {
              keyValuePairs.push(pair[0] + "=" + pair[1]);
            }
        
            var formDataString = keyValuePairs.join("&");
        
            // Send a POST request to your Google Apps Script
            fetch(
              "https://script.google.com/macros/s/AKfycbym6MhWIEXXHM2OpACYVMNfqUfpuEjry6-EHqDh7k56vje6ZF9il9RQtjUvE2RD_DmC_w/exec",
              {
                redirect: "follow",
                method: "POST",
                body: formDataString,
                headers: {
                  "Content-Type": "text/plain;charset=utf-8",
                },
              }
            )
              .then(function (response) {
                // Check if the request was successful
                if (response) {
                  return response; // Assuming your script returns JSON response
                } else {
                  throw new Error("Failed to add money.");
                }
              })
              .then(function (data) {
                // Display a success message
                document.getElementById("message").textContent = "Money added successfully!";
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.backgroundColor = "green";
                document.getElementById("message").style.color = "beige";
                document.getElementById("submit-button").disabled = false;
                document.getElementById("form").reset();
        
                setTimeout(function () {
                  document.getElementById("message").textContent = "";
                  document.getElementById("message").style.display = "none";
                }, 2600);
              })
              .catch(function (error) {
                // Handle errors, you can display an error message here
                console.error(error);
                document.getElementById("message").textContent = "An error occurred while adding money.";
                document.getElementById("message").style.display = "block";
              });
        });
        
        // Cancel button function
        document.getElementById("cancel-button").addEventListener("click", function () {
            document.getElementById("form").reset(); // Reset form fields
            document.getElementById("message").style.display = "none"; // Hide message
        });
        

