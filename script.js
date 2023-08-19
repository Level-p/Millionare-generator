const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMilionairesBtn = document.getElementById('show-milionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch Random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  // console.log(data);

  const user =  data.results[0];

  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser)
}

// Add new user to data arr
function addData(user) {
  data.push(user);

  updateDOM();
}


// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return {...user, money: user.money * 2}
  })

  updateDOM()
}

// Sort users by richest
function sortByRichest () {
 data =  data.sort((a,b) => b.money - a.money);

  updateDOM()
}


// Filter only Milionaires
function showMilionaires() {
  data = data.filter((user) => user.money > 1000000)

  updateDOM(); 
}


// Total wealth
function calculateWealth() {
  const total = data.reduce((acc, user) => (acc += user.money), 0)
    const div = document.createElement('div');
    div.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`
    
    main.appendChild(div);
}

// Update DOM
function updateDOM(profileData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  profileData.forEach( profile => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${profile.name}</strong> ${formatMoney(profile.money) }`
    
    main.appendChild(div);
  })
}

// Format number as money
function formatMoney(number) {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listerners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMilionairesBtn.addEventListener('click', showMilionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);