var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line', // sau 'bar', 'pie', etc.
    data: {
        labels: ['Punct A', 'Punct B', 'Punct C'],
        datasets: [{
            label: 'Exemplu de grafic',
            data: [10, 25, 15], // datele tale
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        // opțiuni suplimentare aici
    }
});
