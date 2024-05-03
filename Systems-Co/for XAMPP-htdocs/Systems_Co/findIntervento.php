<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data sent from React
$data = file_get_contents('php://input');

// Debugging retreive data  ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Received data: " . print_r($data, true));
if ($data === null) {
    die("Error decoding JSON data");
}

$cliente = $data;

// Prepare SQL statement
$stmt = $conn->prepare("SELECT i.Id, c.Nome, i.IdCommittente, i.Matricola, i.Tipologia, i.Costo, i.DataIntervento FROM interventi as i JOIN committenti as c ON i.IdCommittente = c.Id WHERE c.Nome = ?");
$stmt->bind_param("s", $cliente);

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if there is a matching name
if ($result->num_rows > 0) {
    // Successful check
    while($row = mysqli_fetch_array($result)){
        $response[] = array('id' => $row["Id"], 'nome' => $row["Nome"], 'idComm' => $row["IdCommittente"],'matricola' => $row["Matricola"], 'tipologia' => $row["Tipologia"], 'costo' => $row["Costo"], 'dataInt' => $row["DataIntervento"]);
    }
} else {
    // Failed check
    $response = array('Error' => "No entry found for this name");
}

// Close prepared statement
$stmt->close();

// Close connection
$conn->close();

// Send response back to React
header('Content-Type: application/json');
echo json_encode($response);
?>