import { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({handleAuthentication}) {
  //Valore input-box della matricola
  const [matricola, setMatricola] = useState('');
  //Valore input-box della password
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  //Funzione di handle per il login contente il check sul contenuto delle textbox e confronto dati con il db
  const handleLogin = async () =>{
    if(matricola.length === 0) {
      alert("Il campo username è vuoto");
    }else if(password.length === 0) {
        alert("Il campo password è vuoto");
    }else {
      try {
        /*Fetch script php presente nella cartella xampp/htdocs/Systems_Co
        passando i valori username (la matricola del dipendente) e password*/
        const response = await fetch('http://localhost/Systems_Co/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ matricola, password }),
        });
        const data = await response.json();
        console.log(data)
        //Per verificare se è andato a buon fine il check controlliamo il valore della key "success"
        if (data.success) {
          handleAuthentication();
          //Se il controllo è andato a buon fine si viene reindirizzati alla dashboard
          nav('/dashboard');
        } else {
          alert("Login failed. Please check your credentials.");
          setMatricola('');
          setPassword('');
        }
      } catch (error) { console.error('Error during login:', error) }
    }
  }

  return (
    <>
      <div id="loginDiv">
        <input type="text" name="matricola" id="matricola" placeholder="Username" value={matricola} onChange={(e) => setMatricola(e.target.value)}/>
        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="button" name="login" id="login" value="Login" onClick={handleLogin}/>
      </div>
    </>
  )
}

export default Login