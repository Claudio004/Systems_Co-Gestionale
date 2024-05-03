import './FindIntervento.css'

function FindIntervento({cliente}) {

  const fetchData = async () => {
    try {
      const entryList = document.getElementById("entry");
      //Fetch per ottenere un array di oggetti riguardante gli interventi
      const response = await fetch('http://localhost/Systems_Co/findIntervento.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: cliente,
      });
      if (!response.ok) { throw new Error('Network response was not ok') }
      const data = await response.json();
      if(data.length > 0){
        entryList.innerHTML = "";
        for(let i = 0; i < data.length; i++){
          entryList.innerHTML += `<p>Id: ${data[i].id} - Nome: ${data[i].nome} - Id Cliente: ${data[i].idComm} - Matricola: ${data[i].matricola} - Tipologia: ${data[i].tipologia} - Costo: ${data[i].costo} - Data: ${data[i].dataInt}</p>`
        }
      }
    } catch (error) { console.error('Error during data fetching:', error) }
  };

  return (
    <><button type='button' id="findIntervento" onClick={fetchData}>Cerca</button></>
  )
}

export default FindIntervento