class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfGenerations = 0;
    let currentVap = this;
    while (currentVap.creator) {
      currentVap = currentVap.creator;
      numOfGenerations ++;
    }
    return numOfGenerations;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (vampire.numberOfVampiresFromOriginal < this.numberOfVampiresFromOriginal) {
      return false;
    }
    return true;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let nameToReturn = null;
    if (this.name === name) return this;
    for (const child of this.offspring) {
      if (child.name === name) {
        return child;
      } else nameToReturn = child.vampireWithName(name);
      if (nameToReturn) {
        break;
      }
    }
    return nameToReturn;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numOfVamps = 0;
   
    for (const child of this.offspring) {
      numOfVamps += child.totalDescendents;
      numOfVamps ++;
    }
    return numOfVamps;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let returnArr = [];
    for (const child of this.offspring) {
      if (child.yearConverted >= 1980) {
        returnArr.push(child);
      }
      returnArr = returnArr.concat(child.allMillennialVampires);
    }
    return returnArr;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let parents1 = vampire.allAncestors(vampire);
    let parents2 = this.allAncestors(this);

    for (const parent of parents1) {
      if (parents2.includes(parent)) {
        return parent;
      }
    }
  }

  allAncestors(vampire) {
    let parents = [];
    if (vampire.creator) {
      parents.push(vampire.creator);
      const returedParent = vampire.allAncestors(vampire.creator);
      if (returedParent !== []) {
        parents = parents.concat(returedParent);
      }
    }
    return parents;
  }
}

let rootVampire = new Vampire("root");
let offspring1 = new Vampire("a");
let offspring2 = new Vampire("b");
let offspring3 = new Vampire("c");
let offspring4 = new Vampire("d");
let offspring5 = new Vampire("e");
let offspring6 = new Vampire("f");
let offspring7 = new Vampire("g");
let offspring8 = new Vampire("h");

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

//offspring7.closestCommonAncestor(offspring4);
 
// console.log(rootVampire.closestCommonAncestor(offspring2).name); //.to.equal(rootVampire.name);
// console.log(rootVampire.closestCommonAncestor(offspring7).name); //to.equal(rootVampire.name);

// console.log(offspring1.closestCommonAncestor(offspring2).name); //to.equal(rootVampire.name);

console.log(offspring4.closestCommonAncestor(offspring7).name); //to.equal(offspring3.name);
// console.log(offspring7.closestCommonAncestor(offspring4).name); //to.equal(offspring3.name);
 

module.exports = Vampire;