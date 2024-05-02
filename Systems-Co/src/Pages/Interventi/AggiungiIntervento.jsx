import { useState, useEffect } from 'react'
import './AggiungiIntervento.css'
import '../Common.css'
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AggiungiIntervento() {
    const [cliente, setCliente] = useState('')
    const [matricola, setMatricola] = useState('')
    const [tipologia, setTipologia] = useState('')
    const [costo, setCosto] = useState('')
    const [dataIntervento, setDataIntervento] = useState("")
    const nav = useNavigate();

    const addIntervento = async () => {
        if((cliente.length <= 0) || (matricola <= 0) || (tipologia.length <= 0) || (costo.length <= 0) || (dataIntervento.length <= 0)){
            alert("Compila tutti i campi!!");
        }else{
            try {
                let costoF = parseFloat(costo.trim());
                console.log(typeof(costoF))
                const response = await fetch('http://localhost/Systems_Co/addIntervento.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', },
                  body: JSON.stringify({ cliente, matricola, tipologia, costoF, dataIntervento }),
                });
                if (!response.ok) { 
                    throw new Error('Network response was not ok') 
                }else{
                    alert("Intervento aggiunto con successo al database!");
                    nav('/Interventi')
                }
            } catch (error) { console.error('Error during data fetching:', error) }
        }
    }
    
    const handleDateChange = (selectedDate) => {
        let d = JSON.stringify(selectedDate);
        let ar = ""
        for(let i = 1; i < 11; i++){
            ar += d[i]
        }
        setDataIntervento(ar);
    };

    return (
        <>
            <div id="sideBar">
                <nav>
                    <div id="links"><Link to="/Dashboard"><p id="link"><b>Dashboard</b></p></Link><br /></div>
                    <div id="links"><Link to="/Clienti"><p id="link"><b>Clienti</b></p></Link><br /></div>
                </nav>
            </div>
            <div id="list">
                <div id="fields">
                    <input type="text" name="cliente" className="dati" placeholder="Inserisci nome cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}/>
                    <input type="number" name="matricola" className="dati" style={{marginLeft: 5 + '%'}} placeholder="Inserisci la matricola dell'operatore" value={matricola} onChange={(e) => setMatricola(e.target.value)}/><br />
                    <input type="text" name="tipologia" className="dati" placeholder="Inserisci la tipologia" value={tipologia} onChange={(e) => setTipologia(e.target.value)}/>
                    <input type="text" name="costo" className="dati" style={{marginLeft: 5 + '%'}} placeholder="Inserisci il costo" value={costo} onChange={(e) => setCosto(e.target.value)}/><br />
                    <DatePicker selected={dataIntervento} onChange={handleDateChange} dateFormat="yyyy-MM-dd" className='dataInt'/>
                </div>
                <input type="button" name="add" id="add" value="Aggiungi" onClick={addIntervento}/>
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default AggiungiIntervento