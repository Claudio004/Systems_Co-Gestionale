<?php
$conn = new mysqli("localhost", "root", "", "db_systems");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

// Debugging retreive data  ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Received data: " . print_r($data, true));
if ($data === null) {
    die("Error decoding JSON data");
}

$cliente = $data['cliente'];
$matricola = $data['matricola'];
$type = $data['tipologia'];
$costo = (float) $data['costoF'];
$dataInt = $data['dataIntervento'];

$query = "SELECT * FROM committenti WHERE Nome = '$cliente' LIMIT 1";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $idComm = $row['Id'];
}

// Debugging SQL queries ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Executing query: " . $query);
if (!$result) {
    die("Error executing query: " . $conn->error);
}

$query = "SELECT * FROM interventi ORDER BY Id DESC LIMIT 1";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $last_id = $row['Id'] + 1;
} else {
    $last_id = 1;
}

// Debugging SQL queries ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Executing query: " . $query);

$stmt = $conn->prepare("INSERT INTO interventi (Id, IdCommittente, Matricola, Tipologia, Costo, DataIntervento) VALUES(?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iiisds", $last_id, $idComm, $matricola, $type, $costo, $dataInt);
$stmt->execute();

$stmt->close();
$conn->close();

header('Content-Type: application/json');
?>