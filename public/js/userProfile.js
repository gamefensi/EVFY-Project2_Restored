//enable/disable editing
$('#editProfile input,#editProfile #saveBtn').prop('disabled', true);
$('#editProfile #editBtn').click(function () {
  if ($('#editProfile input').prop('disabled', true)) {
    $('#editProfile input:disabled,#editProfile button:disabled').removeAttr('disabled');
    $(this).addClass('btn-secondary');
    $(this).removeClass('btn-primary');
    $("#editProfile #saveBtn").addClass('btn-success');
    $("#editProfile #saveBtn").removeClass('btn-secondary');
  } ;
});
//redisable on close
$('#profileModal button.close').click(function() {
  $('#editProfile input,#editProfile #saveBtn').prop('disabled', true);
  $("#editProfile #saveBtn").addClass('btn-secondary');
  $("#editProfile #saveBtn").removeClass('btn-success');
  $("#editProfile #editBtn").addClass('btn-primary');
  $("#editProfile #editBtn").removeClass('btn-secondary');
});

/* show file value after file select */
document.querySelector('.custom-file-input').addEventListener('change', function (e) {
  var fileName = document.getElementById("customFile").files[0].name;
  var nextSibling = e.target.nextElementSibling
  nextSibling.innerText = fileName
})

