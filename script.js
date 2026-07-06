// 1. Sample data.
// Eventually this list will come from a real server (that's what we build
// in the next repo), but for now we just hardcode it as a JavaScript array
// of objects so we can focus on getting the display logic right first.
const printJobs = [
{ customer: "Amir K.", item: "Phone Stand", material: "PLA", quantity: 2, status: "In Progress" },
{ customer: "Dana R.", item: "Miniature Figurine", material: "Resin", quantity: 5, status: "Queued" },
{ customer: "Lucas T.", item: "Drone Propeller", material: "PETG", quantity: 4, status: "Completed" },
];

// 2. Grab a reference to the box in index.html we want to fill.
// This is the same <div id="job-list"> from lesson 1.
const jobListContainer = document.getElementById("job-list");

// 3. A function that takes ONE job object and builds an HTML element for it.
function createJobCard(job) {
const card = document.createElement("div");
card.className = "job-card";

card.innerHTML = `
<h3>${job.item}</h3>
<p>Customer: ${job.customer}</p>
<p>Material: ${job.material} &times; ${job.quantity}</p>
<span class="status">${job.status}</span>
`;

return card;
}

// 4. A function that clears whatever is currently in the container,
// then builds and inserts a card for every job in the list.
function renderJobs(jobs) {
jobListContainer.innerHTML = "";

jobs.forEach(function (job) {
const card = createJobCard(job);
jobListContainer.appendChild(card);
});
}

// 5. Actually run it.
renderJobs(printJobs);
