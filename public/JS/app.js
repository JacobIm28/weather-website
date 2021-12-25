fetch('http://localhost:3000/weather?address=Boston').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.location)
    }
  })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  m1.textContent = 'Loading...'
  m2.textContent = ''

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        m1.textContent = data.error
      } else {
        m1.textContent = data.location
        m2.textContent = data.forecast
      }
    })
  })

  document.querySelector('input').value = ''
})
