
// array creation
const numbers: number[] = [1,2,3,4,5]
console.log(numbers)

const fruits: string[] = ['apple', 'banana', 'cherry']
console.log(fruits)

const vegetables: string[] = ['potato', 'tomato', 'cucumber']

const animals: string[] = ["dog", "cat", "elephant", "bee"]

const items: string[] = ['table', 'cup', 'computer', 'pen']

const mixedData: (number| string| boolean)[] = [1, 'test', 'apple', false]
console.log(mixedData)

const customers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

type Book = {title: string, year: number}
const books: Book[] = [
{title: 'Harry Potter', year: 2001},
{title: 'God Father', year: 1995},
{title: 'Pinnochio', year: 2015},
{title: 'Turtles', year: 2000}
]

const onlyBooksNames = books.map(book => book.title)
console.log(onlyBooksNames)

type User = {id: number, name: string}
const users: User[] = [
{id: 1, name: 'Anna'},
{id: 2, name: 'Taras'},
{id: 3, name: 'Maksym'},
{id: 4, name: 'Elena'},
{id: 5, name: 'Margaret'}
]
console.log(users)
//basic arrays methods
fruits.push('orange')
console.log(fruits)
fruits.pop()
console.log(fruits)
const plants = fruits.concat(vegetables)
console.log(plants)

if (numbers.includes(7)){
    console.log('the array includes the number')
}else{
    console.log('the array does not include the number')
}

const includesResult = numbers.includes(3)
console.log(includesResult)

//use map feature
const mapNumbers = numbers.map(num => num * 10)
console.log(mapNumbers)

const mapNumbers2 = numbers.map((value, index) => `The item value: index are ${value}: ${index}`)
console.log(mapNumbers2)

const fruitsWithIndex = fruits.map((value, index)=> `${value}-${index}`)
console.log(fruitsWithIndex)

//use filter feature
const filterNumbers = numbers.filter(num => num % 2 === 0)
console.log(filterNumbers)

const animalsFiltered = animals.filter(animal => animal.length > 3)
console.log(animalsFiltered)

//use .find()
const findBiggerNumber = mapNumbers.find(num => num > 25)
console.log(findBiggerNumber)
const findBob = customers.find(customer => customer.name === 'Bob')
console.log(findBob)

//use methods combination
const multiplyOddNumbers = (arr: number[]): number[] =>{ 
const filterOdd = arr.filter(num => num % 2 != 0)
console.log(filterOdd)
const newNumbers = filterOdd.map(num => num * 10)
return newNumbers
}
console.log(multiplyOddNumbers(numbers))

const findItems = (arr: string[]): object =>{
const find = arr.find(item => item.length > 5)
const isPresent = arr.includes('pen')
return {find, isPresent}
}
console.log(findItems(items))


// additional tasks
const squareNumbers = (arr: number[]):number[] => arr.map(number => number ** 2)
console.log(squareNumbers(numbers))


const findReleasedAfter2000 = (arr: Book[]): string[] =>{
const after2000 = arr.filter(book => book.year > 2000)
const onlyNames = after2000.map(book => book.title)
return onlyNames
}
console.log(findReleasedAfter2000(books))

const getTitlesAfter2000 = (arr: Book[]): string[] => //more advanced option
  arr.filter(book => book.year > 2000).map(book => book.title);

console.log(getTitlesAfter2000(books));