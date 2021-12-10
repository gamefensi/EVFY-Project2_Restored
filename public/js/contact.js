//create variables to store generated codes and the type of characters we want to show as codes
var code = " "; // initialize to null value
var getCode = " ";
var btnvalue;
var str =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

//Function to generate combination of characters
function generateCode() {
  //generate character multiple times using a loop
  for (i = 1; i <= 7; i++) {
    var char = Math.random() * str.length; //random select a character from the variable
    code = code + str.charAt(char); // accumulate the generated character into a sting of 8
  }
  return code;
}

//get HTML element to display
document.getElementById("codes").innerHTML = generateCode();

//ask client whether or not disable random code??

// //Disable Button
// function disableButton(btnvalue) {
//   document.getElementById("send").disabled = btnvalue; 
//   if (btnvalue == true) {
//     document.getElementById("send").style.backgroundColor =
//       "LimeGreen";
//     document.getElementById("send").style.color = "white";
//   } else {
//     document.getElementById("send").style.backgroundColor =
//       "rgba(73, 119, 209, 1)";
//     document.getElementById("send").style.color = "rgba(255, 255, 255, 1)";
//   }
// }

// disableButton(btnvalue);

// //listen to user input code
// var codebox = document.getElementById("codeentered");
// codebox.addEventListener("input", evaluateCode);
// function evaluateCode() {
//   getCode = document.getElementById("codeentered").value;
//   var charset1 = getCode.trim();
//   var charset2 = code.trim();
//   if (charset1.length == charset2.length && charset1 == charset2) {
//     disableButton(false);
//   }
// }
// evaluateCode();

