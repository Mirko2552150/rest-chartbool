
$.ajax({
    url: 'http://157.230.17.132:4015/sales',
    method: 'GET',
    success: function (data) {
        console.log(data);
    },
    error: function() {
        alert('error')
    }
});
