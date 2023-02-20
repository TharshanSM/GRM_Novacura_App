const employees = [
    { id: "Table1", name: "Neil Conan" },
    { id: "Table2", name: "Adam San" },
    { id: "Table3", name: "Laura Dean" },
    { id: "Table4", name: "Sahnun Dean" },
    { id: "Table5", name: "Lesi Milan" },
    { id: "Table6", name: "Sheron Brina" },
];

employees.forEach((employee) => {
    $(document).ready(function () {
        var $col = $("<div>").addClass("col-4");
        var $card = $("<div>").addClass("card");
        var $cardBody = $("<div>").addClass("card-body");
        var $cardTitle = $("<h5>").addClass("card-title").text(employee.name);
        var $table = $("<table>")
            .addClass("table table-hover")
            .attr("id", employee.id);
        var $thead = $("<thead>");
        var $tr = $("<tr>");
        var $thProject = $("<th>").attr("scope", "col").text("Project");
        var $thWeek = $("<th>").attr("scope", "col").text("Week");
        var $thAllocation = $("<th>").attr("scope", "col").text("Allocation");
        var $tbody = $("<tbody>").attr("id", employee.id);

        $tr.append($thProject, $thWeek, $thAllocation);
        $thead.append($tr);
        $table.append($thead, $tbody);
        $cardBody.append($cardTitle, $table);
        $card.append($cardBody);
        $col.append($card);
        $("#container").append($col);
    });
});

employees.forEach((emp) => {
    fetch("http://localhost:3000/allocations/get/")
        .then((response) => response.json())
        .then((data) => {
            let i = data.recordsets[0];
            i.forEach((element) => {
                let row = $("<tr>");
                let col1 = $("<td>").html(element.project_name);
                let col2 = $("<td>").html(element.week_number);
                let col3 = $("<td>").html(element.allocation);
                row.append(col1, col2, col3);
                $(`#${emp.id}`).append(row);
            });
            $(`#${emp.id}`).Grid({
                pagination: true,
                search: true,
                sort: true,
                resizable: true,
            });
        });
});

//  Add Schedule
function addSchedule(event) {
    event.preventDefault();

    fetch("http://localhost:3000/allocations/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emp_id: document.getElementById("emp_id").value,
            project_id: document.getElementById("project_id").value,
            role_id: document.getElementById("role_id").value,
            week_id: document.getElementById("week_id").value,
            allocation: document.getElementById("allocation").value,
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    location.href = "http://127.0.0.1:5500/Frontend/pages-schedule.html";
}

var options = {
    series: [
        {
            name: "Allocations",
            data: [80, 60, 60, 60, 80, 40],
        },
    ],
    chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
            show: true,
        },
        zoom: {
            enabled: true,
        },
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0,
                },
            },
        },
    ],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
                total: {
                    enabled: false,
                    style: {
                        fontSize: "13px",
                        fontWeight: 900,
                    },
                },
            },
        },
    },
    xaxis: {
        type: "Week",
        categories: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05"],
    },
    legend: {
        position: "right",
        offsetY: 40,
    },
    fill: {
        opacity: 1,
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
