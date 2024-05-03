import './FindCliente.css'

function FindCliente({cliente}) {

  const fetchData = async () => {
    try {
      const entryList = document.getElementById("entry");
      //Fetch per ottenere un array di oggetti riguardante gli interventi
      const response = await fetch('http://localhost/Systems_Co/findCliente.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: cliente,
      });
      if (!response.ok) { throw new Error('Network response was not ok') }
      const data = await response.json();
      if(data.length > 0){
        entryList.innerHTML = "";
        for(let i = 0; i < data.length; i++){
          entryList.innerHTML += `<p>Id: ${data[i].id} - Nome: ${data[i].nome} - Città: ${data[i].city} - Indirizzo: ${data[i].indirizzo} - CAP: ${data[i].Cap} - Telefono: ${data[i].Telefono} - Email: ${data[i].Email}</p>`
        }
      }
    } catch (error) { console.error('Error during data fetching:', error) }
  };

  return (
    <><button type='button' id="findCliente" onClick={fetchData}>Cerca</button></>
  )
}

export default FindCliente