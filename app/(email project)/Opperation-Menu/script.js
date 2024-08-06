document.addEventListener('DOMContentLoaded', () => {
    const dummyAssignees = ["Jack", "Emily", "Jon", "TBD"];
    let dummyVettingSubmissions = [
        { Client: "Malcolm", Page: "Open", Urgent: "Yes", Completed: "Yes", Assignee: "Jack" },
        { Client: "Reycon", Page: "Open", Urgent: "Yes", Completed: "No", Assignee: "Emily" },
        { Client: "Pilkington", Page: "Open", Urgent: "No", Completed: "Yes", Assignee: "Jon" },
        { Client: "Legacy", Page: "Closed", Urgent: "Yes", Completed: "Yes", Assignee: "Jon" },
        { Client: "Blake", Page: "Open", Urgent: "No", Completed: "No", Assignee: "TBD" },
        { Client: "Bernardo", Page: "Open", Urgent: "Yes", Completed: "No", Assignee: "TBD" },
        { Client: "Mahmod", Page: "Open", Urgent: "No", Completed: "No", Assignee: "TBD" },
        { Client: "David", Page: "Open", Urgent: "No", Completed: "No", Assignee: "TBD" },
        { Client: "Jack", Page: "Open", Urgent: "No", Completed: "No", Assignee: "TBD" },
    ];

    let submissionsToggled = false;

    function renderSubmissions(submissions) {
        const submissionsContainer = document.getElementById('submissions');
        submissionsContainer.innerHTML = '';
        submissions.forEach(sub => {
            const row = document.createElement('div');
            row.className = 'submission-row';
            row.innerHTML = `
                <p>${sub.Client}</p>
                <p>${sub.Page}</p>
                <p>${sub.Urgent}</p>
                <input type="checkbox" ${sub.Completed === 'Yes' ? 'checked' : ''} class="checkbox">
                <select class="select">
                    <option disabled selected>${sub.Assignee}</option>
                    ${dummyAssignees.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
            `;
            submissionsContainer.appendChild(row);
        });
    }

    function handleClientSort(column) {
        if (submissionsToggled) {
            submissionsToggled = false;
            dummyVettingSubmissions.sort((a, b) => (a[column] < b[column] ? -1 : 1));
        } else {
            submissionsToggled = true;
            dummyVettingSubmissions.sort((a, b) => (a[column] < b[column] ? 1 : -1));
        }
        renderSubmissions(dummyVettingSubmissions);
    }

    function handleSearch(event) {
        const query = event.target.value.toLowerCase();
        const filteredSubmissions = dummyVettingSubmissions.filter(sub => sub.Client.toLowerCase().includes(query));
        renderSubmissions(filteredSubmissions);
    }

    document.querySelectorAll('.sort-button').forEach(button => {
        button.addEventListener('click', () => handleClientSort(button.dataset.column));
    });

    document.getElementById('search').addEventListener('input', handleSearch);

    renderSubmissions(dummyVettingSubmissions);
});
