
$.ajax({
    url: 'http://157.230.17.132:4015/sales',
    method: 'GET',
    success: function (data) {
        var rispostaJson = data;
        var oggettoIntermedio = {
            gennaio: 0,
            febbraio: 0,
            marzo: 0,
            aprile: 0,
            maggio: 0,
            giugno: 0,
            luglio: 0,
            agosto: 0,
            settembre: 0,
            ottobre: 0,
            novembre: 0,
            dicembre: 0

        }; // per ordinare i mesi creo le chiavi in ordine

        for (var i = 0; i < rispostaJson.length; i++) { // cicliamo l'Arrey di oggetti dalla risposta Json
            var rispostaSingolaJson = rispostaJson[i]; // creiamo il nostro singolo oggetto presente nella chiamata Json
            var fatturato = rispostaSingolaJson.amount; // fatturato dei ventiri estrapolati dalla chiamata con ciclo for
            var dataVendita = rispostaSingolaJson.date;
            var dataVendita = moment(rispostaSingolaJson.date, 'DD/MM/YYYY');
            var meseVendita = dataVendita.locale('it').format('MMMM');

            if (oggettoIntermedio[meseVendita] === undefined) { // se mese vendita non è definito, assegno 0 al volore e creo la chiave []
                oggettoIntermedio[meseVendita] = 0;
            }
                oggettoIntermedio[meseVendita] += fatturato; // pusho il fatturato a ogni chiave anche se già presente
            }

            var asseMesi = [];
            var asseMesiOrdinata = asseMesi.sort();
            var asseFatturato = [];

            for (var key in oggettoIntermedio) {
                asseMesi.push(key); // pusho dentro i mesi le KEY (che sono i MESI)
                asseFatturato.push(oggettoIntermedio[key])  // pusho dentro i mesi i volori di tutte le KEY (che sono i FATTURATI)
            }

            var ctx = $('#grafico-uno');
            var chart = new Chart(ctx, {
                type: 'line',

                data: {
                    labels: asseMesi,
                    datasets: [{
                        label: 'Fatturato 2017',
                        backgroundColor: 'rgb(150, 50, 80)',
                        borderColor: 'rgb(200, 50, 80)',
                        data: asseFatturato // 12 data che corrispondono ai mesi
                    }]
                },
            });
    },
    error: function() {
        alert('error')
    }
});
$.ajax({
    url: 'http://157.230.17.132:4015/sales',
    method: 'GET',
    success: function (data) {
        var rispostaJson = data;
        // console.log(rispostaJson);
        var oggettoIntermedio = {}; // per ordinare i mesi creo le chiavi in ordine
        for (var i = 0; i < rispostaJson.length; i++) {
            var rispostaSingolaJson = rispostaJson[i];
            var venditore = rispostaSingolaJson.salesman;
            var fatturato = rispostaSingolaJson.amount;
            // console.log(fatturato);
            if (oggettoIntermedio[venditore] === undefined) {
                oggettoIntermedio[venditore] = 0; // creiamo chiavi univoche
            }
            oggettoIntermedio[venditore] += fatturato;

        }
        // console.log(oggettoIntermedio);

        var nomiVenditori = [];
        var valoreVenditeVenditori = [];
        // console.log(valoreVenditeVenditori);

        for (var key in oggettoIntermedio) {
            nomiVenditori.push(key) // pushi le chiavi, usandoil nome dato nel ciclo for in
            valoreVenditeVenditori.push(oggettoIntermedio[key]) // pusho il il valore della chiave venditore []
        }
        // console.log(nomiVenditori);
        // console.log(valoreVenditeVenditori);

        // var fatturatoTotale = valoreVenditeVenditori.reduce(function(a, b){ // somma fatturati dei venditori
        // return a + b;
        // }, 0);
        // // console.log(fatturatoTotale);
        //
        // for (var i = 0; i < valoreVenditeVenditori.length; i++) {
        //     var percentuale = (valoreVenditeVenditori[i] / fatturatoTotale) * 100;
        //     console.log(percentuale);
        // }

        var ctx = $('#grafico-due');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nomiVenditori,
                datasets: [{
                    label: 'Qualità Venditori 2017',
                    backgroundColor: ['pink', 'red', 'blue', 'green'],
                    borderColor: 'white',
                    data: valoreVenditeVenditori
                }]
            },
        });

    },
    error: function() {
        alert('error')
    }
});
