function fetchJSON( url, method='GET', data={} ){
    // post requires header, method + data to be sent
    const fetchOptions = { 
        headers: { 'Content-Type': 'application/json' },
        method,
    }
    // for PUT/POST we need to attach the data posted to server
    if( method==='POST' || method==='PUT' ) 
      fetchOptions.body = JSON.stringify( data )
    
    return fetch( url,fetchOptions ).then( res=>res.json() )
  }	


  async function addBurger(){

    if(document.querySelector("#burgerName").value === ""){
      alert(`Enter the burger name`)
    }
    else{

    console.log( `[submitQuote] create button pressed` )
  
    const burgerData = {
    burger_name: document.querySelector("#burgerName").value
    }
    const result = await fetchJSON( `/api/add`, 'POST', burgerData )
    console.log( ` new burger id is`, result )
    // Reload the page to get the updated list
    location.reload()}

  }

  async function updateBurger(id){
    console.log(`the burger id is ${id} `)
    // const burgerID = {id:id}

    const result = await fetchJSON(`/api/update/${id}`,'PUT') 
    location.reload()
  }