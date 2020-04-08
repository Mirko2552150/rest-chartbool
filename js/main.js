
getLine();
getPie();

function getProcessedData(data) {
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
        var fatturato = parseInt(rispostaSingolaJson.amount); // fatturato dei ventiri estrapolati dalla chiamata con ciclo for
        var dataVendita = rispostaSingolaJson.date;
        var dataVendita = moment(rispostaSingolaJson.date, 'DD/MM/YYYY');
        var meseVendita = dataVendita.locale('it').format('MMMM');

        if (oggettoIntermedio[meseVendita] === undefined) { // se mese vendita non è definito, assegno 0 al volore e creo la chiave []
            oggettoIntermedio[meseVendita] = 0;
        }
            oggettoIntermedio[meseVendita] += parseInt(fatturato); // pusho il fatturato a ogni chiave anche se già presente (uso parseInt per sommare ed eviitare stringhe di Numeri)
        }

        var asseMesi = [];
        var asseMesiOrdinata = asseMesi;
        var asseFatturato = [];

        for (var key in oggettoIntermedio) {
            asseMesi.push(key) // pushi le chiavi, usandoil nome dato nel ciclo for in
            asseFatturato.push(oggettoIntermedio[key]) // pusho il il valore della chiave venditore []
        }
        return {
            mesi: asseMesi, // ritorno un oggetto che richiamero con la dotnotation
            fatturato: asseFatturato
        }
}

function getProcessedDataDue(data) {
    var rispostaJson = data;
    var oggettoIntermedio = {}; // per ordinare i mesi creo le chiavi in ordine
    for (var i = 0; i < rispostaJson.length; i++) {
        var rispostaSingolaJson = rispostaJson[i];
        var venditore = rispostaSingolaJson.salesman;
        var fatturato = parseInt(rispostaSingolaJson.amount);
        // console.log(fatturato);
        if (oggettoIntermedio[venditore] === undefined) {
            oggettoIntermedio[venditore] = 0; // creiamo chiavi univoche
        }
        oggettoIntermedio[venditore] += fatturato;

    }
    var nomiVenditori = [];
    var valoreVenditeVenditori = [];
    getGraficoDue(nomiVenditori, valoreVenditeVenditori);
    for (var key in oggettoIntermedio) {
        nomiVenditori.push(key) // pushi le chiavi, usandoil nome dato nel ciclo for in
        valoreVenditeVenditori.push(oggettoIntermedio[key]) // pusho il il valore della chiave venditore []
    }
    return { // ritorniamo in oggetto
        venditori: nomiVenditori, // chiave fittizzia e nel valore mettiamo quello da estrapolare
        valoreVendite: valoreVenditeVenditori
    }
}

function getGraficoUno(asseMe, asseFattura) {
    var ctx = $('#grafico-uno');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: asseMe,
            datasets: [{
                label: 'Fatturato 2017',
                backgroundColor: 'rgb(150, 50, 80)',
                borderColor: 'rgb(200, 50, 80)',
                data: asseFattura // 12 data che corrispondono ai mesi
            }]
        },
    });
}

function getGraficoDue(nomiVendito, valoreVenditeVendito) {
    var ctx = $('#grafico-due');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: nomiVendito,
            datasets: [{
                label: 'Qualità Venditori 2017',
                backgroundColor: ['pink', 'red', 'blue', 'green'],
                borderColor: 'white',
                data: valoreVenditeVendito
            }]
        },
    });
}

$(".bottone-invio").click(function(){
    postNewData();

});

function postNewData() {
    var salesman = ($('.name-venditori').val()).charAt(0).toUpperCase() + ($('.name-venditori').val()).slice(1); // metto mauioscola primo carattere
    var dataSelezionato = moment($(".input-date").val()).format("DD/MM/YYYY"); // prendo il valore e lo organizzo con Moment
    var newAmount = parseInt($(".input-fatturato").val());
    $.ajax({
        url: 'http://157.230.17.132:4015/sales',
        method: 'POST', // indica aggiunta nuovi dati all'API
        data : {"salesman": salesman, "amount": newAmount, "date": dataSelezionato},
        success: function (data) {
            console.log(data);
            getLine(); // invoco funzione per aggiornare grafici (dentro il success)
            getPie();

        },
        error: function() {
            alert('error')
        }
    });
}

function getLine() {
    $.ajax({
        url: 'http://157.230.17.132:4015/sales',
        method: 'GET',
        success: function (data) {
            var datiProcessati = getProcessedData(data); // assegnamo oggetto risultante dalla funzione
            getGraficoUno(datiProcessati.mesi, datiProcessati.fatturato); // con il DOT natation mettiamo le VAR in ingresso
        },
        error: function() {
            alert('error')
        }
    });
}

function getPie() {
    $.ajax({
        url: 'http://157.230.17.132:4015/sales',
        method: 'GET',
        success: function (data) {
            var datiProcessati = getProcessedDataDue(data); // in datiProc entreranno i dati
            // console.log(datiProcessati.venditori, datiProcessati.valori);
            getGraficoDue(datiProcessati.venditori, datiProcessati.valoreVendite);

        },
        error: function() {
            alert('error')
        }
    });
}
