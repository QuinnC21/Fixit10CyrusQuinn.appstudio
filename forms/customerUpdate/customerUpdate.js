req = ""
query = ""
results = ""

customerUpdate.onshow = function() {
  drpUpdate.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ccq85664&pass=" + pw + "&database=ccq85664&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
    console.log(results)
  }
  if (results.length == 0) {

    console.log("There are no customers to Update.")
  } else {
    
    for (i = 0; i <= results.length - 1; i++)
      drpUpdate.addItem(results[i])
  }
}

let oldName = ''

drpUpdate.onclick = function(s) {
  // check to see if dropdown was clicked
  if (typeof(s) == "object")
    return
  else {
    drpUpdate.value = s // make dropdown show the choice the user made
    oldName = s
  }
}


btnUpdate.onclick = function() {
  let newName = inpNewName.value

  let found = false
  for (i = 0; i <= results.length - 1; i++)
   
    if (oldName == results[i]) {
      found = true
      break
    }

  if (found == false)
    console.log("That customer name is not in the database.")
  else if (found == true) {
    query = `UPDATE customer SET name = '${newName}' WHERE name = '${oldName}'`
     req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ccq85664&pass=" + pw + "&database=ccq85664&query=" + query)

    if (req.status == 200) { //transit worked.
      if (req.responseText == 500) { // means the update succeeded
       console.log(`You have successfully changed the customers name!`)
        
        inpNewName.value = ""
        drpUpdate.value = "Customer"
      } else
        console.log(`There was a problem changing the Customers name.`)
    } else
  
      console.log(`Error: ${req.status}`);
  } 
  query = "SELECT name from customer"
   req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ccq85664&pass=" + pw + "&database=ccq85664&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
  }
 if (results.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers in tabel.")
  } else {
    // putting new list of customers into txtDelete
    let customersUpdate = ""
    for (i = 0; i <= results.length - 1; i++)
      customersUpdate = customersUpdate + results[i] + "\n"
    // change value of text area
    txtUpdate.value = customersUpdate
  }
}