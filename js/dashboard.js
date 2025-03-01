
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
    document.getElementById('User-link').style.display = "flex"
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

    function h2022() {
        window.open('Exam/H 2022-23/' + currentUserAd+".pdf"); 
    }

    function a2022() {
        window.open('Exam/2022-23/' + currentUserAd+".pdf"); 
    }

    function h2023() {
        window.open('Exam/H 2023-24/' + currentUserAd+".pdf"); 
    }

    function a2023() {
        window.open('Exam/2023-24/' + currentUserAd+".pdf"); 
    }

    function h2024() {
        window.open('Exam/H 2024-25/' + currentUserAd+".pdf"); 
    }

    function a2024() {
        window.open('Exam/2024-25/' + currentUserAd+".pdf"); 
    }

    function rsthz() {
        window.open('Arts Fest/RASTAKHIZ/' + currentUserAd+".pdf"); 
    }

    function arpnt() {
        window.open('Arts Fest/ARPANET/' + currentUserAd+".pdf"); 
    }

    function alkrm() {
        window.open('Arts Fest/AL-KARAMA/' + currentUserAd+".pdf"); 
    }


    //Achievements

    function janac() {
        window.open('Achievements/January/' + currentUserAd + ".pdf");
    }
    
    function febac() {
        window.open('Achievements/February/' + currentUserAd + ".pdf");
    }
    
    function marac() {
        window.open('Achievements/March/' + currentUserAd + ".pdf");
    }
    
    function aprac() {
        window.open('Achievements/April/' + currentUserAd + ".pdf");
    }
    
    function mayac() {
        window.open('Achievements/May/' + currentUserAd + ".pdf");
    }
    
    function junac() {
        window.open('Achievements/June/' + currentUserAd + ".pdf");
    }
    
    function julac() {
        window.open('Achievements/July/' + currentUserAd + ".pdf");
    }
    
    function augac() {
        window.open('Achievements/August/' + currentUserAd + ".pdf");
    }
    
    function sepac() {
        window.open('Achievements/September/' + currentUserAd + ".pdf");
    }
    
    function octac() {
        window.open('Achievements/October/' + currentUserAd + ".pdf");
    }
    
    function novac() {
        window.open('Achievements/November/' + currentUserAd + ".pdf");
    }
    
    function decac() {
        window.open('Achievements/December/' + currentUserAd + ".pdf");
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

        const cardsContainer = document.getElementById('cards-container');

        // Fetch JSON data
        async function fetchJSON() {
            const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${FILE_PATH}`);
            return response.json();
        }

        // Render cards
        function renderCards(data) {
            cardsContainer.innerHTML = '';
            data.forEach((user, index) => {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <h3>${user.Username}</h3>
                    <p><strong>Password:</strong>${user.Password}</p>
                    <button onclick="toggleDetails(${index})">Edit</button>
                    <div class="details" id="details-${index}">
                        ${renderDetails(user, index)}
                        <button onclick="saveChanges(${index})">Save</button>
                        <button onclick="cancelEdit(${index})">Cancel</button>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        }

        // Render detailed fields
        function renderDetails(user, index) {
            let fieldsHTML = '';
            for (const key in user) {
                if (typeof user[key] === 'object') {
                    fieldsHTML += `
                        <div class = "oc">
                            <textarea id="${key}-${index}">${JSON.stringify(user[key], null, 2)}</textarea>
                        </div>
                    `;
                } else {
                    fieldsHTML += `
                        <div>
                            <input type="text" id="${key}-${index}" value="${user[key]}">
                        </div>
                    `;
                }
            }
            return fieldsHTML;
        }

        // Toggle details visibility
        function toggleDetails(index) {
            const details = document.getElementById(`details-${index}`);
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
        }

        // Cancel edit
        function cancelEdit(index) {
            document.getElementById(`details-${index}`).style.display = 'none';
        }

        // Save changes
        async function saveChanges(index) {
            const jsonData = await fetchJSON();

            for (const key in jsonData[index]) {
                const input = document.getElementById(`${key}-${index}`);
                if (input) {
                    try {
                        jsonData[index][key] = JSON.parse(input.value); // Parse JSON if object
                    } catch (e) {
                        jsonData[index][key] = input.value; // Treat as string for other fields
                    }
                }
            }

            // Update JSON file on GitHub
            const fileSHA = await getFileSHA();
            await updateJSONOnGitHub(jsonData, fileSHA);

            // Refresh UI
            renderCards(jsonData);
            alert('Changes saved successfully!');
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

        // Initialize
        async function init() {
            const data = await fetchJSON();
            renderCards(data);
        }

        init();

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

        const currentUserAd = loggedInUser.adno;


        function janach() {
            window.open('Photo/' + currentUserAd+".jpg"); 
        }

        

