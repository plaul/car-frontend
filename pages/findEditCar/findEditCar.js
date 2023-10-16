import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions,showHideSpinner } from "../../utils.js"

const emptyDTO = { id: "", brand: "", model: "", pricePrDay: "", bestDiscount: "" }

//Add id to this URL to get a single user
const URL = `${API_URL}/cars/admin`
let status
export async function initFindEditCar(match) {
  status = document.getElementById("status")
  status.innerText = ""
  Object.keys(emptyDTO).forEach(key => {
    const input =  document.getElementById("edit-car-form").querySelector(`[name=${key}]`)
    input && (input.value = emptyDTO[key])
  })

  const idFromRequest = match?.params?.id
  document.getElementById("car-id-input").value = idFromRequest || ""
  document.getElementById("btn-fetch-car").addEventListener("click", findCar)
  if (idFromRequest) {
    renderCar(idFromRequest)
  }
}

async function findCar() {
  status.innerText = ""
  const id = document.getElementById("car-id-input").value
  renderCar(id)
}

async function renderCar(id) {
  try {
    showHideSpinner("spinner", true)
    const carDTO = await fetch(URL + "/" + id, makeOptions("GET", null, true)).then(handleHttpErrors)
    showHideSpinner("spinner", false)
    const editCarForm = document.getElementById("edit-car-form")
    Object.keys(carDTO).forEach(key => {
      const input = editCarForm.querySelector(`[name=${key}]`)
      //This ensures that what comes after the && is only executed if input is NOT null (will happen if the form does not have fields for all properties)
      input && (input.value = carDTO[key])
    })
  } catch (err) {
    showHideSpinner("spinner", false)
    const status = document.getElementById("status")
    status.style.color = "red"
    status.style.marginTop = "10px"
    status.innerText = err.message
  }
}