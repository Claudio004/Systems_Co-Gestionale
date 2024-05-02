import { useState } from 'react'
import './AggiungiCliente.css'
import '../Common.css'
import { Link, useNavigate } from 'react-router-dom';

function AggiungiCliente() {
    //Valore search-textbox
    const [cliente, setCliente] = useState('')
    const [città, setCittà] = useState('')
    const [via, setVia] = useState('')
    const [CAP, setCAP] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const nav = useNavigate();

    const addCliente = async () => {
        if((cliente.length <= 0) || (città.length <= 0) || (via.length <= 0) || (CAP.length <= 0) || (telefono.length <= 0) || (email <= 0)){
            alert("Compila tutti i campi!!");
        }else{
            try {
                //Fetch per aggiungere i dati del cliente nel db
                const response = await fetch('http://localhost/Systems_Co/addCliente.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', },
                  body: JSON.stringify({ cliente, città, via, CAP, telefono, email }),
                });
                if (!response.ok) { 
                    throw new Error('Network response was not ok') 
                }else{
                    alert("Cliente aggiunto con successo al database!");
                    nav('/Clienti')
                }
            } catch (error) { console.error('Error during data fetching:', error) }
        }
    }

    return (
        <>
            <div id="sideBar">
                <nav>
                    <div id="links"><Link to="/Interventi"><p id="link"><b>Interventi</b></p></Link><br /></div>
                    <div id="links"><Link to="/Dashboard"><p id="link"><b>Dashboard</b></p></Link><br /></div>
                </nav>
            </div>
            <div id="list">
                <div id="fields">
                    <input type="text" name="cliente" class="dati" placeholder="Inserisci nome cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}/>
                    <input type="text" name="città" class="dati" style={{marginLeft: 5 + '%'}} placeholder="Inserisci la città" value={città} onChange={(e) => setCittà(e.target.value)}/><br />
                    <input type="text" name="via" class="dati" placeholder="Inserisci la via" value={via} onChange={(e) => setVia(e.target.value)}/>
                    <input type="number" name="CAP" class="dati" style={{marginLeft: 5 + '%'}} placeholder="Inserisci il CAP" value={CAP} onChange={(e) => setCAP(e.target.value)}/><br />
                    <input type="text" name="telefono" class="dati" placeholder="Inserisci il numero di telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                    <input type="text" name="email" class="dati" style={{marginLeft: 5 + '%'}} placeholder="Inserisci l'email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                </div>
                <input type="button" name="add" id="add" value="Aggiungi" onClick={addCliente}/>
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default AggiungiCliente