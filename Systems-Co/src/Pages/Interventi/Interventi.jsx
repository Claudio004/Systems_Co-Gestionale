import './Interventi.css'
import '../Common.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FindIntervento from '../spec_components/FindIntervento.jsx'
import AddIntervento from'../spec_components/AddIntervento.jsx'

function Interventi() {
    //Valore search-textbox
    const [cliente, setCliente] = useState('')

    //Trigger per il recupero dei dati di tutti gli interventi
    useEffect(() => {
        const fetchData = async () => {
            const entryList = document.getElementById("entry");
            try {
                //Fetch per ottenere un array di oggetti riguardante gli interventi
                const response = await fetch('http://localhost/Systems_Co/getInterventi.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
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

        fetchData();
    }, []);

    return (
        <>
            <div id="sideBar">
                <nav>
                    <div id="links"><Link to="/Dashboard"><p id="link"><b>Dashboard</b></p></Link><br /></div>
                    <div id="links"><Link to="/Clienti"><p id="link"><b>Clienti</b></p></Link><br /></div>
                </nav>
            </div>
            <div id="list">
                <input type="text" name="cliente" id="inCliente" placeholder="Inserisci nome cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}/>
                <FindIntervento cliente={cliente}/>
                <AddIntervento />
                <div id="entry"></div>
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default Interventi