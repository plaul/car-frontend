import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows,makeOptions } from "../../utils.js"

export async function initListReservationsAll() {
  document.getElementById("error").innerText = ""
  try {
    
    const URL = API_URL + "/reservations"
    const reservations = await fetch(URL,makeOptions("GET",null,true)).then(handleHttpErrors)
    const rows = reservations.map(res =>  { 
      console.log(res)
      console.log(res.carId)
      console.log(res.carb)
      return `
    <tr>
      <td>${res.carId}</td>
      <td>${res.brand}</td>
      <td>${res.model}</td>
      <td>${res.reservationDate}</td>
      <td>${res.pricePrDay}</td>
    </tr>
   `}).join("\n")
    const safeRows = sanitizeStringWithTableRows(rows)
    document.getElementById("tablerows").innerHTML = safeRows
  } catch (err) {
    if (err.apiError) {
      document.getElementById("error").innerText = err.apiError.message
    } else {
      document.getElementById("error").innerText = err.message + FETCH_NO_API_ERROR
      console.error(err.message + FETCH_NO_API_ERROR)
    }
  }
}

