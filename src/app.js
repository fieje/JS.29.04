const express = require('express');
const cors = require('cors');
const app = express();
const host = 'localhost';
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

let stations = [
    {
        id: 1,
        address: "690 Collins Avenue. Worthington",
        status: true
    },
    {
        id: 2,
        address: "1234 Elm Street. Springfield",
        status: false
    },
    {
        id: 3,
        address: "777 Pine Avenue. Lakeside",
        status: true
    },
    {
        id: 4,
        address: "456 Oak Lane. Riverdale",
        status: false
    },
    {
        id: 5,
        address: "1010 Maple Road. Hillcrest",
        status: true
    },
    {
        id: 6,
        address: "2345 Cedar Court. Brookside",
        status: false
    },
    {
        id: 7,
        address: "891 Birch Street. Lakeview",
        status: true
    },
    {
        id: 8,
        address: "333 Pine Avenue. Sunset Hills",
        status: false
    },
    {
        id: 9,
        address: "678 Walnut Drive. Green Valley",
        status: true
    },
    {
        id: 10,
        address: "444 Ash Street. Riverside",
        status: false
    }
];

app.get('/stations', (req, res) => {
    res.send(stations);
});

app.get('/stations/:id', (req, res) => {
    const station = stations.find(st => st.id == req.params.id);
    res.send(station);
});
app
<script>
async function addStation() {
    const addressInput = document.getElementById('addressInput').value;

    fetch('/stations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: addressInput })
    })
    .then(response => {
        if (response.ok) {
            console.log('Station added successfully');

            loadStations();
        } else {
            console.error('Failed to add station');
        }
    })
    .catch(error => {
        console.error('Error adding station:', error);
    });
}

async function deleteStation(id) {
    fetch(`/stations/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Station ${id} deleted successfully`);

            loadStations();
        } else {
            console.error(`Failed to delete station ${id}`);
        }
    })
    .catch(error => {
        console.error(`Error deleting station ${id}:`, error);
    });
}

async function loadStations() {
    const stationsList = document.getElementById('stationsList');
    stationsList.innerHTML = '';

    fetch('/stations')
    .then(response => response.json())
    .then(data => {
        data.forEach(station => {
            const li = document.createElement('li');
            li.textContent = `${station.id}: ${station.address} - ${station.status ? 'Active' : 'Inactive'}`;
            stationsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error loading stations:', error);
    });
}

app.post('/stations', (req, res) => {
    const station = req.body;
    const stationId = stations.length > 0 ? stations[stations.length - 1].id + 1 : 1;
    const newStation = { id: stationId, ...station };
    stations.push(newStation);
    res.send(newStation);
    loadStations();
});

app.delete('/stations/:id', (req, res) => {
    const stationId = parseInt(req.params.id);
    stations = stations.filter(st => st.id !== stationId);
    res.send("Station " + stationId + " has been deleted");
    loadStations(); 
});


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
