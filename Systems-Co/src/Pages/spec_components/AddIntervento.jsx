import './AddIntervento.css'
import { Link } from 'react-router-dom';

function AddIntervento() {
  return (
    <><Link to="/insertIntervento" className="link"><p id="addIntervento">Aggiungi</p></Link></>
  )
}

export default AddIntervento