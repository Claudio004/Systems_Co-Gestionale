import './Interventi.css'
import '../Common.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import FindIntervento from '../spec_components/FindIntervento.jsx'
import AddIntervento from'../spec_components/AddIntervento.jsx'

function Interventi() {
    //Valore search-textbox
    const [cliente, setCliente] = useState('')

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
                <FindIntervento />
                <AddIntervento />
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default Interventi