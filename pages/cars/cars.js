import { API_URL } from "../../settings.js"
const URL = API_URL + "/cars/admin"
import {sanitizeStringWithTableRows,makeOptions} from "../../utils.js"

export async function initCars() {
  document.getElementById("table-rows").addEventListener("click", navigateToEditCar)
  //const cars = await fetch(URL).then((res)=>handleHttpErrors(res))
  const cars = await fetch(URL,makeOptions("GET",null,true)).then(res => res.json())

  const tableRows = cars.map(car => `
  <tr>
  <td>${car.id}</td>
  <td>${car.brand}</td>
  <td>${car.model}</td>
  <td>${car.pricePrDay}</td>
  <td>${car.bestDiscount}</td>
  <td><button id="row-btn_${car.id}" class="btn btn-sm btn-dark">Add/Edit</td>
  </tr>
  `)
  const tableRowsAsStr = tableRows.join("")

  document.getElementById("table-rows").innerHTML = sanitizeStringWithTableRows(tableRowsAsStr)
}

function navigateToEditCar(evt){
  const btn = evt.target
  if(!btn.id.includes("row-btn_")){
    return
  }
  const id = btn.id.split("_")[1]
  window.router.navigate("find-edit-car?id="+id)
}