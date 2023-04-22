const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    document.getElementById('message-container').innerText = data.message;
};

fetchData();