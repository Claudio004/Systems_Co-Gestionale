import { useState, useEffect } from 'react'
import './Clienti.css'
import '../Common.css'
import { Link } from 'react-router-dom';
import AddCliente from '../spec_components/AddCliente.jsx'
import FindCliente from '../spec_components/FindCliente.jsx'

function Clienti() {
    //Valore search-textbox
    const [cliente, setCliente] = useState('')

    //Trigger per calcolo contatori "interventi" e "committenti"
    useEffect(() => {
        const fetchData = async () => {
            const entryList = document.getElementById("entry");
            try {
                //Fetch per ottenere un array di oggetti riguardante gli interventi
                const response = await fetch('http://localhost/Systems_Co/getClienti.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
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

        fetchData();
    }, []);

    return (
        <>
            <div id="sideBar">
                <nav>
                    <div id="links"><Link to="/Interventi"><p id="link"><b>Interventi</b></p></Link><br /></div>
                    <div id="links"><Link to="/Dashboard"><p id="link"><b>Dashboard</b></p></Link><br /></div>
                </nav>
            </div>
            <div id="list">
                <input type="text" name="cliente" id="inCliente" placeholder="Inserisci nome cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}/>
                <FindCliente cliente={cliente}/>
                <AddCliente />
                <div id="entry"></div>
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default Clienti