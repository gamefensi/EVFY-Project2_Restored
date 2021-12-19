function generatePw() {
    var i,
        n = 8,
        text = '',
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(i=0; i < n; ++i){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    $('#codes').text(text);
}

$(document).ready(function(){
  generatePw();
  $('#reset').on("click", function(){
    generatePw()
  });
});

$('#send').submit(function(event) {
  //disable submit
  event.preventDefault()
})



