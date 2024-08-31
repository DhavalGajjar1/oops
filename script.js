let users = [];
let editIndex = null;

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    if (editIndex !== null) {
        users[editIndex] = { name: userName, email: userEmail };
        editIndex = null;
    } else {
        users.push({ name: userName, email: userEmail });
    }

    resetForm();
    renderTable();
});

function resetForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    editIndex = null;
}

function renderTable() {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    users.forEach((user, index) => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.innerText = user.name;
        tr.appendChild(nameTd);

        const emailTd = document.createElement('td');
        emailTd.innerText = user.email;
        tr.appendChild(emailTd);

        const actionsTd = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = function() {
            document.getElementById('userName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            editIndex = index;
        };
        actionsTd.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            users.splice(index, 1);
            renderTable();
        };
        actionsTd.appendChild(deleteButton);

        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
    });
}
