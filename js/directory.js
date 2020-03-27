
const directory = 'https://randomuser.me/api/?results=12';
const employeeList = document.getElementById('people');
const details = document.getElementById('details');


function getEmployees(json) {
  const employees = json.results.map( employee => {
    return(employee)
  });
  return Promise.all(employees);
  console.log(employees);
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map( employee => {
    console.log(employee);
    const section = document.createElement('section');
    employeeList.appendChild(section);
    section.innerHTML = `
        <img class="employeePhoto" src="${employee.picture.large}">
        <div class="info">
          <h3 class="employeeName">${employee.name.first + ' ' + employee.name.last}</h3>
          <p class="employeeInfo">${employee.location.city}</p>
          <p class="employeeInfo">${employee.email}</p>
          <hr class=hiddenInfo>
          <p class="hiddenInfo">${employee.phone}</p>
          <p class="hiddenInfo">${employee.location.street.number + ' ' + employee.location.street.name + ', ' + employee.location.state + ' ' + employee.location.postcode}</p>
          <p class="hiddenInfo">${employee.dob.date}</p>
        </div>
    `;

    section.addEventListener('click', (event) => {
      details.innerHTML = `
      <div class="overlay animate">
        <h2 class="exit"> X </h2>
        <img class="employeePhoto" src="${employee.picture.large}">
        <div class="info">
          <h3 class="employeeName">${employee.name.first + ' ' + employee.name.last}</h3>
          <p class="employeeInfo">${employee.location.city}</p>
          <p class="employeeInfo">${employee.email}</p>
          <hr>
          <p class="employeeInfo">${employee.phone}</p>
          <p class="employeeInfo">${employee.location.street.number + ' ' + employee.location.street.name + ', ' + employee.location.state + ' ' + employee.location.postcode}</p>
          <p class="employeeInfo">${employee.dob.date}</p>
        </div>
      </div>
      `;

      employeeList.classList.add('blurr');

      document.addEventListener('click', (event) => {
        if(event.target.className === 'exit') {
          details.innerHTML = '';
          employeeList.classList.remove('blurr');
        }
      });
    });
  });
}

  fetch(directory)
    .then( response => response.json() )
    .then(getEmployees)
    .then(generateHTML)
    .catch( err => {
      employeeList.innerHTML = '<h3>Something went wrong!</h3>';
      console.log(err)
      })
