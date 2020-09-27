const uppercaseLtrs = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const lowercaseLtrs = 'qwertyuiopasdfghjklzxcvbnm'
const numbers = '1234567890'
const symbols = '!@#$%^&*()'

const $output = document.getElementById('pw-output')
const $len = document.getElementById('len')
const $upper = document.getElementById('upper')
const $lower = document.getElementById('lower')
const $number = document.getElementById('number')
const $symbol = document.getElementById('symbol')
const $button = document.getElementById('button')
const $clone = document.getElementById('clone-btn')

$button.addEventListener('click', generatePassword)
$clone.addEventListener('click', copyToClipboard)
window.addEventListener('load', generatePassword)

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
  return uppercaseLtrs[Math.floor(Math.random() * uppercaseLtrs.length)]
}

function getLower() {
  return lowercaseLtrs[Math.floor(Math.random() * lowercaseLtrs.length)]
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)]
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)]
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
