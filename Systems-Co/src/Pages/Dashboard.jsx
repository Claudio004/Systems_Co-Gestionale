import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './Common.css';
import { Link } from 'react-router-dom';
import Clienti from './Clienti/Clienti';
import Interventi from './Interventi/Interventi';

function Dashboard() {
    //Contatore interventi registrati nel db
    const [count, setCount] = useState('Network Error...');
    //Contatore committenti registrati nel db
    const [countC, setCountC] = useState('Network Error...');
    //Contatore interventi eseguiti nel mese di Gennaio dell'anno corrente
    const [countGennaio, setCountGennaio] = useState('0');
    //Contatore interventi eseguiti nel mese di Febbraio dell'anno corrente
    const [countFebbraio, setCountFebbraio] = useState('0');
    //Contatore interventi eseguiti nel mese di Marzo dell'anno corrente
    const [countMarzo, setCountMarzo] = useState('0');
    //Contatore interventi eseguiti nel mese di Aprile dell'anno corrente
    const [countAprile, setCountAprile] = useState('0');
    //Contatore interventi eseguiti nel mese di Maggio dell'anno corrente
    const [countMaggio, setCountMaggio] = useState('0');
    //Contatore interventi eseguiti nel mese di Giugno dell'anno corrente
    const [countGiugno, setCountGiugno] = useState('0');
    //Contatore interventi eseguiti nel mese di Luglio dell'anno corrente
    const [countLuglio, setCountLuglio] = useState('0');
    //Contatore interventi eseguiti nel mese di Agosto dell'anno corrente
    const [countAgosto, setCountAgosto] = useState('0');
    //Contatore interventi eseguiti nel mese di Settembre dell'anno corrente
    const [countSettembre, setCountSettembre] = useState('0');
    //Contatore interventi eseguiti nel mese di Ottobre dell'anno corrente
    const [countOttobre, setCountOttobre] = useState('0');
    //Contatore interventi eseguiti nel mese di Novembre dell'anno corrente
    const [countNovembre, setCountNovembre] = useState('0');
    //Contatore interventi eseguiti nel mese di Dicembre dell'anno corrente
    const [countDicembre, setCountDicembre] = useState('0');

    //Trigger per calcolo contatori "interventi" e "committenti"
    useEffect(() => {
        const fetchData = async () => {
            try {
                //Fetch per ottenere un array di oggetti riguardante gli interventi
                const response = await fetch('http://localhost/Systems_Co/countInterventi.php');
                if (!response.ok) { throw new Error('Network response was not ok') }
                const data = await response.json();
                //Imposta il valore del contatore degli interventi in base alla lunghezza dell'array di oggetti
                setCount(data.length);
            } catch (error) { console.error('Error during data fetching:', error) }

            try {
                //Fetch per ottenere un array di oggetti riguardante i committenti
                const response = await fetch('http://localhost/Systems_Co/countClienti.php');
                if (!response.ok) { throw new Error('Network response was not ok') }
                const data = await response.json();
                //Imposta il valore del contatore dei committenti in base alla lunghezza dell'array di oggetti
                setCountC(data.length);
            } catch (error) { console.error('Error during data fetching:', error) }

            try {
                //Fetch per ottenere un array di oggetti riguardante gli interventi di ogni mese
                const response = await fetch('http://localhost/Systems_Co/countIntMonth.php');
                if (!response.ok) { throw new Error('Network response was not ok') }
                const data = await response.json();
                /*Imposta il valore del contatore degli interventi dei vari mesi prendendo il valore contenuto nel valore di indice 0 di ogni sotto-array 
                confrontandolo con il mese contenuto del valore di indice 1 di ogni sotto-array*/
                for(let i = 0; i < data.length; i++){
                    switch(data[i][1]){
                        case 'Gennaio':
                            setCountGennaio(data[i][0]);
                            break;
                        case 'Febbraio':
                            setCountFebbraio(data[i][0]);
                            break;
                        case 'Marzo':
                            setCountMarzo(data[i][0]);
                            break;
                        case 'Aprile':
                            setCountAprile((data[i][0]));
                            break;
                        case 'Maggio':
                            setCountMaggio((data[i][0]));
                            break;
                        case 'Giugno':
                            setCountGiugno((data[i][0]));
                            break;
                        case 'Luglio':
                            setCountLuglio((data[i][0]));
                            break;
                        case 'Agosto':
                            setCountAgosto((data[i][0]));
                            break;
                        case 'Settembre':
                            setCountSettembre((data[i][0]));
                            break;
                        case 'Ottobre':
                            setCountOttobre((data[i][0]));
                            break;
                        case 'Novembre':
                            setCountNovembre((data[i][0]));
                            break;
                        case 'Dicembre':
                            setCountDicembre((data[i][0]));
                            break;
                    }
                }
            } catch (error) { console.error("Error during data fetch", error) }
        };
    
        fetchData();
    }, []);

    return (
        <>
            <div id="sideBar">
                <nav>
                    <div id="links"><Link to="/Interventi"><p id="link"><b>Interventi</b></p></Link><br /></div>
                    <div id="links"><Link to="/Clienti"><p id="link"><b>Clienti</b></p></Link><br /></div>
                </nav>
            </div>
            <div id="intAnnoCorr">
                <h1 id="ian">Interventi Anno Corrente</h1>
                <table>
                    <tr><th>Gennaio</th><th>{countGennaio}</th></tr>
                    <tr><th>Febbraio</th><th>{countFebbraio}</th></tr>
                    <tr><th>Marzo</th><th>{countMarzo}</th></tr>
                    <tr><th>Aprile</th><th>{countAprile}</th></tr>
                    <tr><th>Maggio</th><th>{countMaggio}</th></tr>
                    <tr><th>Giugno</th><th>{countGiugno}</th></tr>
                    <tr><th>Luglio</th><th>{countLuglio}</th></tr>
                    <tr><th>Agosto</th><th>{countAgosto}</th></tr>
                    <tr><th>Settembre</th><th>{countSettembre}</th></tr>
                    <tr><th>Ottobre</th><th>{countOttobre}</th></tr>
                    <tr><th>Novembre</th><th>{countNovembre}</th></tr>
                    <tr><th>Dicembre</th><th>{countDicembre}</th></tr>
                </table>
            </div>
            <div id="rdiv">
                <h1 id="intTot">Interventi totali: {count}</h1>
                <h1 id="cTot">Clienti totali: {countC}</h1>
            </div>
            <footer><b>Copyright ©2024 All rights reserved</b></footer>
        </>
    )
}

export default Dashboard;