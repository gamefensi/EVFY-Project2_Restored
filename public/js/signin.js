
$(function(){
    $('.hide-show').show();
    $('.hide-show span').addClass('show')
    
    $('.hide-show span').click(function(){
      if( $(this).hasClass('show') ) {
        $(this).text('HIDE');
        $('input[id="password"]').attr('type','text');
        $(this).removeClass('show');
      } else {
         $(this).text('SHOW');
         $('input[id="password"]').attr('type','password');
         $(this).addClass('show');
      }
    })
  });
//   $(function(){
//     $('.hide-show').show();
//     $('.hide-show span').addClass('show')
    
//     $('.hide-show span').click(function(){
//       if( $(this).hasClass('show') ) {
//         $(this).text('HIDE');
//         $('input[id="l_password"]').attr('type','text');
//         $(this).removeClass('show');
//       } else {
//          $(this).text('SHOW');
//          $('input[id="l_password"]').attr('type','password');
//          $(this).addClass('show');
//       }
//     })
//   });