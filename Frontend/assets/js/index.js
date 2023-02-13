document.addEventListener("DOMContentLoaded", () => {
    new Chart(document.querySelector("#pieChart"), {
        type: "pie",
        data: {
            labels: ["Project A", "Project B", "Project C"],
            datasets: [
                {
                    label: "Projects Weekly Allocations",
                    data: [300, 50, 100],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                    ],
                    hoverOffset: 4,
                },
            ],
        },
    });
});

let ctx = document.getElementById("barChart").getContext("2d");
let myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05"],
        datasets: [
            {
                label: "Project 01",
                data: [20, 60, 10],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Project 02",
                data: [40, 20, 40],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Project 02",
                data: [40, 20, 20],
                backgroundColor: "rgba(255, 205, 86, 0.2)",
                borderColor: "rgba(255, 205, 86, 1)",
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    },
});
