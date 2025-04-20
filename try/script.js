const API_URL = 'https://script.google.com/macros/s/AKfycbxkmps30RWVTl-V5WVYFqzzYFhCAiRCdk3Tuxr70BTGwnoxmVn3bXlwlgqLtmaM27JI6g/exec'; // Replace with your script URL

document.addEventListener('DOMContentLoaded', () => {
  loadUsers();

  document.getElementById('userForm').addEventListener('submit', addUser);

  document.getElementById('userTable').addEventListener('click', function (e) {
    const target = e.target;
    const row = target.closest('tr');
    const id = parseInt(row.dataset.row);

    if (target.classList.contains('update-btn')) {
      const user = {
        action: 'update',
        id,
        Username: row.children[1].textContent.trim(),
        Password: row.children[2].textContent.trim(),
        Name: row.children[3].textContent.trim(),
        phone: row.children[4].textContent.trim()
      };
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user)
      }).then(() => loadUsers());
    }

    if (target.classList.contains('delete-btn')) {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', id })
      }).then(() => loadUsers());
    }
  });
});

function loadUsers() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('userTable');
      tbody.innerHTML = '';
      data.forEach(user => {
        tbody.innerHTML += `
          <tr data-row="\${user.id}">
            <td>\${user.id}</td>
            <td contenteditable="true">\${user.Username}</td>
            <td contenteditable="true">\${user.Password}</td>
            <td contenteditable="true">\${user.Name}</td>
            <td contenteditable="true">\${user.phone}</td>
            <td>
              <button class="update-btn">Update</button>
              <button class="delete-btn">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

function addUser(e) {
  e.preventDefault();
  const user = {
    action: 'add',
    Username: document.getElementById('username').value,
    Password: document.getElementById('password').value,
    Name: document.getElementById('name').value,
    phone: document.getElementById('phone').value
  };
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(user)
  }).then(() => {
    loadUsers();
    e.target.reset();
  });
}