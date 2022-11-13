// variables
let loginList = []
let login = document.getElementById('login')
let password = document.getElementById('password')
let generateButton = document.querySelector('.generate-button')
let dataMatrix = document.querySelector('.datamatrix')
let removeButton = document.querySelector('.remove-button')
let existingLogins = document.querySelector('select')


// ================================================
const showDataMatrix = function (user, pass) {
  dataMatrix.style.backgroundImage = `url(http://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${user}%5E009${pass}&parse&scale=5&option=parse)`;
  login.value = ''
  password.value = ''
}


const addDataToArray = function (user, pass) {
  loginList.push({ login: user, password: pass })
  localStorage.setItem("logins", JSON.stringify(loginList))
}


const validateDataBeforAdd = function (user, pass) {
  if (user === '' || pass === '') {
    alert('login and password cannot be empty')
    return false
  }
  if (loginList.length === 0) {
    return true
  }
  let c = 0
  loginList.forEach(e => {
    if (e.login === user && e.password === pass) {
      c += 1
    }
  })
  if (c > 0) {
    alert('user with same login and password already exist')
    return false
  }
  return true
}


const redrawLoginsList = function () {
  document.getElementById('login-value').innerHTML = ''
  loginList.forEach(element => {
    let option = document.createElement('option')
    option.value = element.login
    option.innerText = element.login
    option.dataset.index = loginList.indexOf(element)
    document.getElementById('login-value').appendChild(option)
    option.selected = true
    localStorage.setItem("selected", option.dataset.index)
  });
}



const createAndShowNewUser = function () {
  let user = login.value
  let pass = password.value
  if (validateDataBeforAdd(user, pass)) {
    addDataToArray(user, pass)
    redrawLoginsList()
    showDataMatrix(user, pass)
  }
}


const switchBetweenLogins = function () {
  document.querySelectorAll('option').forEach(e => {
    if (e.selected) {
      showDataMatrix(loginList[e.dataset.index].login, loginList[e.dataset.index].password)
      localStorage.setItem("selected", e.dataset.index)
    }
  })
}


const removeUserFromList = function () {
  document.querySelectorAll('option').forEach(e => {
    if (e.selected) {
      loginList.splice(e.dataset.index, 1)
    }
  })
  localStorage.setItem("logins", JSON.stringify(loginList))
  redrawLoginsList()
  switchBetweenLogins()
  if (loginList.length === 0) {
    dataMatrix.style.backgroundImage = ''
    localStorage.setItem("selected", '')
  }
}


// ==================================================================
// ==================================================================
// ==================================================================
generateButton.addEventListener('click', createAndShowNewUser)
existingLogins.addEventListener('change', switchBetweenLogins)
removeButton.addEventListener('click', removeUserFromList)
password.addEventListener('keypress', function checkKey(e) {
  if (e.key === "Enter") {
    createAndShowNewUser()
  }
})



window.addEventListener('load', () => {
  let selectedItem = localStorage.getItem('selected');
  let array = localStorage.getItem('logins');
  if(array != null) {
     loginList = JSON.parse(array);
  }
  redrawLoginsList()
  document.querySelectorAll('option').forEach(e => {
    if (e.dataset.index === selectedItem) {
      e.selected = true
    }
  })
  switchBetweenLogins()
})
