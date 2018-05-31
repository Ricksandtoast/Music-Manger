// constructor function used to create programmers objects
function Programmer() {
  name :"Rick";
}

// creates the printInfo method and applies it to all programmer objects
// Programmer.prototype.printInfo = function() {
//   console.log("Name: " + this.name + "\nPosition: " + this.position +
//   "\nAge: " + this.age + "\nLanguages: " + this.language);
// };

// new programmer object is initialized to bob and is provided with the variables
// necessary to create all of the properties
var bob = new Programmer();


// calls the printInfo method for bob to print all of his information to the console
// bob.printInfo();
console.log(bob.name)