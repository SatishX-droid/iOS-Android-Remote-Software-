async function fetchData(activityType) {
    try {
        const response = await fetch(`http://<YOUR_SERVER_URL>/fetch/${activityType}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        document.getElementById('dataDisplay').innerText = `${activityType}: ${result.data}`;
    } catch (error) {
        document.getElementById('dataDisplay').innerText = `Error: ${error.message}`;
    }
}
