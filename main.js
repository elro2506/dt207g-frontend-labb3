const url = "https://dt207g-labb3.onrender.com/experience";

function getData() {
    fetch(url)
        .then(response => response.json())
        .then(data => writeExperience(data))
        .catch(err => console.log("Error" + err));
}

//Skriver ut data
function writeExperience(data) {
    const tbody = document.querySelector("#list tbody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${item.company}</td>
        <td>${item.jobtitle}</td>
        <td>${item.location}</td>
        <td>${item.startdate}</td>
        <td>${item.enddate}</td>
        <td><button>Radera</button></td>
        `;

        const button = tr.querySelector("button");


        button.onclick = () => deleteExperience(item._id); 

        tbody.appendChild(tr);

    });
}

function deleteExperience(id) {
    fetch(`${url}/${id}`, {
        method: "DELETE"
    })
        .then(() => getData())
        .catch(err => console.log("Error" + err));
}

async function sendApiRequest(data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error" + error);
    }
}

getData();