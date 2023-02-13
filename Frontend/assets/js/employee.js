fetch("http://localhost:3000/allocations/employees/")
    .then((response) => response.json())
    .then((data) => {
        let tableBody = document.getElementById("emp");
        let i = data.recordsets[0];
        i.forEach((element) => {
            let row = document.createElement("tr");
            let col1 = document.createElement("td");
            col1.innerHTML = element.id;
            let col2 = document.createElement("td");
            col2.innerHTML = element.first_name;
            let col3 = document.createElement("td");
            col3.innerHTML = element.last_name;
            let col4 = document.createElement("td");
            col4.innerHTML = element.join_date;
            let col5 = document.createElement("td");
            col5.innerHTML = element.status;
            let col6 = document.createElement("td");
            col6.innerHTML = element.manager_id;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col6);
            tableBody.appendChild(row);
        });
        // $(document).ready(function () {
        //     $("#emptable").DataTable({
        //         select: true,
        //     });
        // });
        $("#emptable").Grid({
            pagination: true,
            search: true,
            sort: true,
            resizable: true,
        });
    });

function addEmployee(event) {
    event.preventDefault();
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const joined_date = document.getElementById("joined_date").value;
    const status = document.getElementById("status").value;
    const manager_id = document.getElementById("manager_id").value;
    console.log(first_name, last_name, joined_date, status, manager_id);

    fetch("http://localhost:3000/allocations/employees/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: first_name,
            lastName: last_name,
            joinDate: joined_date,
            status: status,
            managerID: manager_id,
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    location.href = "http://127.0.0.1:5500/Frontend/pages-employees.html";
}
