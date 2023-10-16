import { API_URL } from "../../settings.js"
import {makeOptions,handleHttpErrors,sanitizeStringWithTableRows} from "../../utils.js"
const URL = API_URL + "/members"

export async function initMembers(){

  const members = await fetch(URL,makeOptions("GET",null,true)).then(handleHttpErrors)

  const rows = members.map(member => `
  <tr><td>${member.username}</td><td>${member.email}</td><td>${member.firstName} ${member.lastName}</td><td>${member.ranking}</td></tr>
  `).join("\n")

  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(rows)
  
}