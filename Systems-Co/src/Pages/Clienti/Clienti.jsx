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
            try {
                //Fetch per ottenere un array di oggetti riguardante gli interventi
                const response = await fetch('http://localhost/Systems_Co/getClienti.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', },
                });
                if (!response.ok) { throw new Error('Network response was not ok') }
                const data = await response.json();
                if(data.lenght > 0){
                  let value = new Array(0)
                  for(let i = 0; i < data.lenght; i++){
                    value.push(`<tr><th>${data[0][i]}</th><th>${data[1][i]}</th><th>${data[2][i]}</th><th>${data[3][i]}</th><th>${data[4][i]}</th><th>${data[5][i]}</th></tr>`)
                  }
                  console.log(value.length);
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
                <FindCliente input={cliente}/>
                <AddCliente />
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default Clienti