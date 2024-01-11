import { employees } from './employeesData.js'

const listEl = document.querySelector('.search-list')
const inputEl = document.querySelector('.search-input')
const employeesEl = document.querySelector('.employees')

let filteredEmployees = employees

listEl.addEventListener('change', filterBySelect)
inputEl.addEventListener('input', filterByInput)


function render(){
    renderFilteredEmployees()
    teamList()
}

function filterBySelect(){
    filteredEmployees = employees.filter(function(employee){
        return listEl.value === 'Everyone' || employee.team === listEl.value  //// spr czy da sie bez drugiego listEl.value
    })
    renderFilteredEmployees()
    listEl.value = '' 
}

function filterByInput(){
    filteredEmployees = employees.filter(function(employee){
       return employee.name.toLowerCase().includes(inputEl.value.toLowerCase())
    })
    renderFilteredEmployees()
}

function teamList() {
    Array.from(new Set(employees.map(function (employee) {
        return employee.team
    }))).forEach(function (team) {
        const capitalizedTeam = team.charAt(0).toUpperCase() + team.slice(1)
        listEl.appendChild(new Option(capitalizedTeam, team))
    })
}

function socialMediaLinks(employee){
    let linksHtml = ''

    const generateLink = function(url, icon, altText){
        return `<a href='${url}' target='_blank'>
            <img src='../images/elements/${icon}' alt='${altText}' class='social-icon'>
        </a>`
    }

    if(employee.social.twitter){
        linksHtml += generateLink(employee.social.twitter, 'social-twitter.png', 'Twitter-icon')
    }
    
    if(employee.social.linkedin){
        linksHtml += generateLink(employee.social.linkedin, 'social-linkedin.png', 'Linkedin-icon')
    }

    return linksHtml
}

function renderFilteredEmployees() {
    const employeesList = filteredEmployees.map(function (employee) {
         return `<div class='employee-card flex'>
            <img class='employee-card-img' src='../images/photos/${employee.image}'
            alt='employee-picture'>
                <h2 class='employee-card-name'>${employee.name}</h2>
                <h3 class='employee-card-title'>${employee.title}</h3>
                <p class='employee-card-bio'>${employee.bio}</p>
                <div class='employee__card-socials flex'>${socialMediaLinks(employee)}</div>
               </div>`
    }).join('')
    employeesEl.innerHTML = employeesList
}

render()

