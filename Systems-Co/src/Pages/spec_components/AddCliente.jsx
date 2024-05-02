import './AddCliente.css'
import { Link } from 'react-router-dom';

function AddCliente() {

  return (
    <><Link to="/insertCliente" className="link"><p id="addCliente">Aggiungi</p></Link></>
  )
}

export default AddCliente