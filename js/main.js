
$.ajax({
    url: 'http://157.230.17.132:4015/sales',
    method: 'GET',
    success: function (data) {
        var rispostaJson = data;
        // console.log(rispostaJson);
        var oggettoIntermedio = {};
        // console.log(rispostaJson);
        for (var i = 0; i < rispostaJson.length; i++) { // cicliamo l'Arrey di oggetti dalla risposta Json
            var rispostaSingolaJson = rispostaJson[i]; // creiamo il nostro singolo oggetto presente nella chiamata Json
            var fatturato = rispostaSingolaJson.amount; // fatturato dei ventiri estrapolati dalla chiamata con ciclo for
            var dataVendita = rispostaSingolaJson.date;
            var dataVendita = moment(rispostaSingolaJson.date, 'DD/MM/YYYY');
            // console.log(dataVendita, rispostaSingolaJson.date);
            var meseVendita = dataVendita.locale('it').format('MMMM');
            // console.log(meseVendita, fatturato);
            if (oggettoIntermedio[meseVendita] === undefined) { // se mese vendita non è definito, assegno 0 al volore e creo la chiave []
            oggettoIntermedio[meseVendita] = 0;
            }
            // console.log(oggettoIntermedio);
            oggettoIntermedio[meseVendita] += fatturato; // pusho il fatturato a ogni chiave anche se già presente
            }
            console.log(oggettoIntermedio);

    },
    error: function() {
        alert('error')
    }
});

var ctx = $('#grafico-uno');
var chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45, 0, 0, 0, 0, 15] // 12 data che corrispondono ai mesi
        }]
    },
});

var ctx = $('#grafico-due');
var chart = new Chart(ctx, {
    type: 'pie',

    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
});
