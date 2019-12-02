class Person {
    constructor ( firstname, lastname, age ) {
        this.name = firstname || 'Vardenis';
        this.surname = lastname || 'Pavardenis';
        this.age = age || 21;
        this.drinksList = ['Baltas bet ne pienas', 'Merė', 'Atsuktuvas'];
        this.selectedDrink = 'Dar nieko. Ka siulai?';
        const secret = ':P';
    }

    showDrinks = () => {
        return this.drinksList;
    }

    chooseDrink = ( drinkIndex ) => {
        this.selectedDrink = this.drinksList[drinkIndex];
        return `Pasirinkimas ${this.name} ${this.surname} yra padarytas.`;
    }

    howOld = () => {
        return this.age;
    }

    drink = () => {
        return this.age >= 21 ? true : 'tik piena';
    }

    showMeYourSecret = () => {
        return secret;
    }
}

const jackieChan = new Person('Jackie', 'Chan', 60);
const chuckNorris = new Person('Chuck', 'Norris', 70);
const pagrandukas = new Person('Pagrandukas', 'Nesakysiu', 3);

console.log(jackieChan);
console.log(jackieChan.howOld());
console.log(jackieChan.drinksList);
console.log(jackieChan.chooseDrink(2));
console.log(jackieChan.selectedDrink);

console.log(chuckNorris);
console.log(chuckNorris.howOld());
console.log(chuckNorris.drinksList);
console.log(chuckNorris.chooseDrink(1));
console.log(chuckNorris.selectedDrink);