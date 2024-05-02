import './FindCliente.css'

function FindCliente({cliente}) {

  const fetchData = async () => {
    try {
        //Fetch per ottenere un array di oggetti riguardante gli interventi
        const response = await fetch('http://localhost/Systems_Co/findCliente.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({input}),
        });
        if (!response.ok) { throw new Error('Network response was not ok') }
        const data = await response.json();
        if(data.lenght > 0){
          let value = new Array()
          for(let i = 0; i < data.lenght; i++){
            value.push(`<tr><th>${data[0][i]}</th><th>${data[1][i]}</th><th>${data[2][i]}</th><th>${data[3][i]}</th><th>${data[4][i]}</th><th>${data[5][i]}</th></tr>`)
          }
        }
    } catch (error) { console.error('Error during data fetching:', error) }
  };

  function addToList(text, day, time){
    const trAdd = document.createElement("tr");
    const thAdd = document.createElement("th");
    const tdAddDay = document.createElement("td");
    const tdAddTime = document.createElement("td");
    const tdAdd = document.createElement("td");

    thAdd.innerHTML = countRows();
    trAdd.appendChild(thAdd);
    tdAddDay.innerHTML = day;
    trAdd.appendChild(tdAddDay);
    tdAddTime.innerHTML = time;
    trAdd.appendChild(tdAddTime);
    tdAdd.innerHTML = text;
    trAdd.appendChild(tdAdd);
    tBody.appendChild(trAdd);
    console.log(tBody);
  }

  return (
    <><button type='button' id="findCliente" onClick={fetchData}>Cerca</button></>
  )
}

export default FindCliente