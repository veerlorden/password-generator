const UPPERCASE = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const LOWERCASE = 'qwertyuiopasdfghjklzxcvbnm'
const NUMBERS = '1234567890'
const SYMBOLS = '!@#$%^&*()'

const $output = document.getElementById('pw-output')
const $len = document.getElementById('len')
const $upper = document.getElementById('upper')
const $lower = document.getElementById('lower')
const $number = document.getElementById('number')
const $symbol = document.getElementById('symbol')
const $buttonMinus = document.getElementById('button-minus')
const $buttonPlus = document.getElementById('button-plus')
const $button = document.getElementById('button-gen')
const $clone = document.getElementById('button-clone')

$button.addEventListener('click', generatePassword)
$clone.addEventListener('click', copyToClipboard)
window.addEventListener('load', generatePassword)
$buttonMinus.addEventListener('click', stepDown)
$buttonPlus.addEventListener('click', stepUp)

function hasChar(password, string) {
  for (let i = 0; i < string.length; i++) {
    if (password.includes(string[i])) {
      return true
    }
  }
  return false
}

function generatePassword() {
  const len = $len.value
  const checked = document.querySelectorAll('input:checked')

  if ((checked.length === 0) || (len < 6 || len > 20)) {
    return false
  }

  let password = ''
  for (let i = 0; i < len; i++) {
    password += generateX()
  }

  if (
      $upper.checked && !hasChar(password, UPPERCASE)
      || $lower.checked && !hasChar(password, LOWERCASE)
      || $number.checked && !hasChar(password, NUMBERS)
      || $symbol.checked && !hasChar(password, SYMBOLS)
  ) {
    generatePassword()
  }

  $output.innerHTML = password
}

function generateX() {
  const xs = []

  if ($upper.checked) {
    xs.push(getUpper())
  }
  if ($lower.checked) {
    xs.push(getLower())
  }
  if ($number.checked) {
    xs.push(getNumber())
  }
  if ($symbol.checked) {
    xs.push(getSymbol())
  }

  return xs[Math.floor(Math.random() * xs.length)]
}

function getUpper() {
  return UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]
}

function getLower() {
  return LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]
}

function getNumber() {
  return NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
}

function getSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
}

function copyToClipboard() {
  const textarea = document.createElement('textarea')
  const password = $output.innerText

  if (!password) return false

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy")
  textarea.remove()
}

function stepUp() {
  this.parentNode.querySelector('#len').stepUp()
}

function stepDown() {
  this.parentNode.querySelector('#len').stepDown()
}
