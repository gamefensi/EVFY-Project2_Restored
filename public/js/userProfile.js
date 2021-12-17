// const mongoose = require("mongoose");
// const User = require("./models/userModel");



$(document).ready(function () {
  $('#profileModal').on('show.bs.modal', function (event) {
    var a = $(event.relatedTarget) // Button that triggered the modal
    var recipient = a.data('user') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(recipient + '\'s Profile')
    modal.find('.modal-body input').val(recipient)
  });
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

})
