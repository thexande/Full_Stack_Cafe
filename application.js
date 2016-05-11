/*
Write a tip calculator program that chooses 2 random menu items , adds them, adds a 20% tip, and returns a total.
Homework stretch : add 7.1 % sales tax, and make program verbose ( tells you which foods ordered , and talks to you about the entire process*/
// declare dependencies
var readline = require('readline'), menu;
var teaCup = "\r\n                             (\r\n                               )     (\r\n                        ___...(-------)-....___\r\n                    .-\"\"       )    (          \"\"-.\r\n              .-'``'|-._             )         _.-|\r\n             /  .--.|   `\"\"---...........---\"\"`   |\r\n            /  /    |                             |\r\n            |  |    |                             |\r\n             \\  \\   |                             |\r\n              `\\ `\\ |                             |\r\n                `\\ `|                             |\r\n                _/ /\\                             /\r\n               (__/  \\                           /\r\n            _..---\"\"` \\                         /`\"\"---.._\r\n         .-'           \\                       /          '-.\r\n        :               `-.__             __.-'              :\r\n        :                  ) \"\"---...---\"\" (                 :\r\n         '._               `\"--...___...--\"`              _.'\r\n           \\\"\"--..__                              __..--\"\"/\r\n            '._     \"\"\"----.....______.....----\"\"\"     _.'\r\n               `\"\"--..,,_____            _____,,..--\"\"`\r\n                             `\"\"\"----\"\"\"`\r\n";
var plate = "                           ___          /|\r\n              ||||     .-\"`   `\"-.     } |  __\r\n         |||| ||||   .'  .-'`'-.  '.   } | /  \\\r\n         |||| \\  /  /  .'       '.  \\  } | ;();\r\n         \\  /  ||  /  ;           ;  \\  \\| \\  /\r\n          ||   ||  | ;             ; |  ||  ||\r\n          %%   %%  | ;             ; |  %%  %%\r\n          %%   %%  \\  ;           ;  /  %%  %%\r\n          %%   %%   \\  '.       .'  /   %%  %%\r\n          %%   %%    '.  `-.,.-'  .'    %%  %%\r\n          %%   %%      '-.,___,.-'      %%  %%\r\n";
var getToTheChoppa = "                     ______\r\n                   <((((((\\\\\\\r\n                   /      . }\\\r\n                   ;--..--._|}\r\n(\\                 '--/\\--'  )\r\n \\\\                | '-'  :'|\r\n  \\\\               . -==- .-|\r\n   \\\\               \\.__.'   \\--._\r\n   [\\\\          __.--|       //  _/'--.\r\n   \\ \\\\       .'-._ ('-----'/ __/      \\\r\n    \\ \\\\     /   __>|      | '--.       |\r\n     \\ \\\\   |   \\   |     /    /       /\r\n      \\ '\\ /     \\  |     |  _/       /\r\n       \\  \\       \\ |     | /        /\r\n        \\  \\      \\        /";
// instanciate menu object
var menuObject = {
  'Apple' : {
    index:0,
    name:'Apple',
    price:1
  },
  'Pulled Pork Sandwich' : {
    index:1,
    name:'Pulled Pork Sandwich',
    price:14.95
  },
  'Pizza' : {
    index:2,
    name:'Pizza',
    price:10.99
  },
  'Gyro' : {
    index:3,
    name:'Gyro',
    price: 7.89
  },
  'White Truffle Cheese Steak' : {
    index:4,
    name:'White Truffle Cheese Steak',
    price: 1099.99
  },
  'Mummified Pork' : {
    index:5,
    name:'Mummified Pork',
    price: 990.99
  }
};
// parent menu
function parentMenu(){
  process.stdout.write('\033c');
  // our menu
  console.log(teaCup + "Welcome to the Galvanize full stack cafe! Please choose an ordering option! \r\n1. Allow a computer to determine your food/drink order.\r\n2. Choose your food the old fashioned way, using your brain!\r\n\r\n");
  // declare our menu
  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // our menu options
  menu.question('Galvanize Cafe Prompt > ', function(input){
    switch(input){
      case '1': autoMenu(); break;
      case '2': userChoiceMenu(); break;
      default: parentMenu(); break;
    }
  });
}
// process our bill accounting for tax and tip
function billProcess(bill){
  // bill total
  var billTotal = 0;
  for (var i = 0; i < bill.length; i++) {
    for(var key in menuObject){
      if(menuObject.hasOwnProperty(key)){
        if(menuObject[key].index === bill[i]){
          // add cost to total bill amount
          billTotal += menuObject[key].price;
        }
      }
    }
  }
  // calc totals
  var gratuity = parseInt(0.2 * billTotal);
  var tax = parseInt(.071 * billTotal);
  var grandTotal = parseInt(billTotal) + parseInt(gratuity) + parseInt(tax);
  console.log("Your bill total before 7.1% tax and 20% gratuity is: $" + billTotal.toFixed(2) + "\n")
  console.log("Gratuity: $" + gratuity.toFixed(2) + "\n")
  console.log("Taxes: $" + tax.toFixed(2) + "\n")
  console.log("Grand Total: $" + grandTotal.toFixed(2) + "\n")
  console.log("Thanks for you business! Come again soon!");
}
// object length function
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
// calculate menu items automatically
function autoMenu(){
  process.stdout.write('\033c');
  console.log("You have allowed a computer to choose your meal for you.\n It is unlikely you will survive Judgement day!\n");
  console.log(getToTheChoppa);
  var customerBill = [];
  // find 2 random menu items
  for (var i = 0; i <= 1; i++) {
    var randyIndex = parseInt(Math.floor(Math.random() * Object.size(menuObject)));
    // loop through menu object for each order index
    for(var key in menuObject){
      if(menuObject.hasOwnProperty(key)){
        // does the index exist in our menuObject object?
        if(randyIndex === menuObject[key].index){
          // our user input matches a menuObject items! add them to our bill and process!
          customerBill.push(menuObject[key].index);
          console.log(menuObject[key].name + " : $" + menuObject[key].price + "\n");
        }
      }
    }
  }
  // process our bill and exit the prompt
  billProcess(customerBill);
  process.exit();
}
// calculate menu items based on user input
function userChoiceMenu(){
  // clear terminal
  process.stdout.write('\033c');
  // show our food menu
  console.log("Your ancestors are proud of your decision to choose your own food. Please choose from the items below.\n\n+-------+----------------------------+----------+\r\n| Index |         Food Item          |  Price   |\r\n+-------+----------------------------+----------+\r\n|     0 | Apple                      | $1.00    |\r\n|     1 | Pulled Pork Sandwich       | $14.95   |\r\n|     2 | Pizza                      | $10.99   |\r\n|     3 | Gyro                       | $7.89    |\r\n|     4 | White Truffle Cheese Steak | $1099.99 |\r\n|     5 | Mummified Pork            | $990.99   |\r\n+-------+----------------------------+----------+\nPlease select food options you would like to order. Ordering multiple items can be done by submitting a list of integers seperated by spaces, for example: 1 3 5 (hit enter at the end)\n")
  // close menu if there is one open
  if(menu) menu.close();
  // start our readline instance
  menu = readline.createInterface({
    input: process.stdin,
    output:process.stdout
  });
  // our bill array for menu indexes
  var customerBill = [];
  // handle our food order
  menu.question('Galvanize Cafe Prompt > ', function(userInput){
    console.log("ORDER UP!!!!\n" + plate)
    console.log("Your order has been taken to the kitchen!\nDo we have your order correct?\n")
      // split our string into an array of strings
      var orderedItems = userInput.split(" ");
      // loop through order array, check if index exists in menu object
      for(i = 0; i < orderedItems.length; i++){
        // console.log(menu[orderedItems[i]]);
        // loop through menu object for each order index
        for(var key in menuObject){
          // console.log(orderedItems[i])
          if(menuObject.hasOwnProperty(key)){
            // does the index exist in our menuObject object?
            if(parseInt(orderedItems[i]) === menuObject[key].index){
              // our user input matches a menuObject items! add them to our bill and process!
              customerBill.push(menuObject[key].index);

              console.log(menuObject[key].name + " : $" + menuObject[key].price + "\n");
            }
          }
        }
      }
      // our bill is now ready to be processed.
      billProcess(customerBill);
      process.exit();
  });
}
// run root menu function
parentMenu();
