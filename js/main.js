
$.ajax({
    url: 'http://157.230.17.132:4015/sales',
    method: 'GET',
    success: function (data) {
        var rispostaJson = data;
        // console.log(rispostaJson);
        var oggettoIntermedio = {};
        // getRispostaSingola(rispostaJson);
        // // console.log(rispostaJson);
        for (var i = 0; i < rispostaJson.length; i++) { // cicliamo l'Arrey di oggetti dalla risposta Json
            var rispostaSingolaJson = rispostaJson[i]; // creiamo il nostro singolo oggetto presente nella chiamata Json
            var amount = rispostaSingolaJson.amount; // fatturato dei ventiri estrapolati dalla chiamata con ciclo for
            console.log(amount);
        }
    },
    error: function() {
        alert('error')
    }
});


var ctx = $('#grafico-uno');
var chart = new Chart(ctx, {
    type: 'line',

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





// function getRispostaSingola(rispostaJ) {
//     for (var i = 0; i < rispostaJ.length; i++) {
//         var rispostaSingolaJ = rispostaJ[i];
//
//     }
// };
