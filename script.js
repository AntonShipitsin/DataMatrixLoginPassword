// variables
let loginList = []
let login = document.getElementById('login')
let password = document.getElementById('password')
let generateButton = document.querySelector('.generate-button')
let dataMatrix = document.querySelector('.datamatrix')
let removeButton = document.querySelector('.remove-button')



//  generate Data Matrix -------------------------------------------------------------------------------------





let generateCode = () => {
  if (login.value === '' || password.value === '') {
    alert('insert login and password')
    return
  }
  let newLogin = login.value
  let newPassword = password.value
  dataMatrix.style.backgroundImage = `url(http://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${newLogin}%5E009${newPassword}&parse&scale=5&option=parse)`;
  if (loginList.length == 0) {
    loginList.push({ login: newLogin, password: newPassword })
  }
  else {
    let counter = 0
    loginList.forEach(e => {
      if (e.login == newLogin && e.password == newPassword) {
        alert('same login and password already in the list')
        counter += 1
      }
    })
    if (counter == 0) {
      loginList.push({ login: newLogin, password: newPassword })
    }
  }
  document.getElementById('login-value').innerHTML = ''
  loginList.forEach(element => {
    let option = document.createElement('option')
    option.value = element.login
    option.innerText = element.login
    option.dataset.index = loginList.indexOf(element)
    document.getElementById('login-value').appendChild(option)
    option.selected = true
  });
  login.value = ''
  password.value = ''
  localStorage.setItem("logins", JSON.stringify(loginList));

}
// ----------------------------------------------------------------------------------------------------------------

// show Data Matrix -------------------------------------------------------------------------------------------------

let showCode = () => {
  let optionList = document.querySelectorAll('option')
  if (optionList.length === 0) {
    dataMatrix.style.backgroundImage = ``;
  }
  optionList.forEach(e => {
    if (e.selected === true) {
      let newLogin = loginList[e.dataset.index].login
      let newPassword = loginList[e.dataset.index].password
      dataMatrix.style.backgroundImage = `url(http://bwipjs-api.metafloor.com/?bcid=datamatrix&text=${newLogin}%5E009${newPassword}&parse&scale=5&option=parse)`;
    }
  })
  localStorage.setItem("logins", JSON.stringify(loginList));
}


let removeCode = function () {
  let optionList = document.querySelectorAll('option')
  optionList.forEach(e => {
    if (e.selected === true) {
      loginList.splice(e.dataset.index, 1)
      document.getElementById('login-value').innerHTML = ''
      loginList.forEach(element => {
        let option = document.createElement('option')
        option.value = element.login
        option.innerText = element.login
        option.dataset.index = loginList.indexOf(element)
        document.getElementById('login-value').appendChild(option)
        option.selected = true
      });
      showCode()
      return
    }
  })
}






// events ===========================================================

// generate code with button  and with Enter key
generateButton.addEventListener('click', generateCode)
password.addEventListener('keypress', function checkKey(e) {
  if (e.key === "Enter") {
    generateCode()
  }
})

//  show code from the list
document.querySelector('select').addEventListener('change', showCode)


//  remove code by pressing button
removeButton.addEventListener('click', removeCode)






