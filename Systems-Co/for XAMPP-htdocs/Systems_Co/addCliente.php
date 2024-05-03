<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve login data sent from React
$data = json_decode(file_get_contents('php://input'), true);

$cliente = $data['cliente'];
$city = $data['città'];
$via = $data['via'];
$CAP = $data['CAP'];
$telefono = $data['telefono'];
$email = $data['email'];


// Query to select the last ID entry
$query = "SELECT Id FROM committenti ORDER BY Id DESC LIMIT 1";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $last_id = $row['Id'] + 1;
} else {
    $last_id = 1;
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO committenti (Id, Nome, Città, Via, CAP, Telefono, Email) VALUES(?,?,?,?,?,?,?)");
$stmt->bind_param("isssiss", $last_id, $cliente, $city, $via, $CAP, $telefono, $email);

// Execute SQL statement
$stmt->execute();

// Close prepared statement
$stmt->close();

// Close connection
$conn->close();

// Send response back to React
header('Content-Type: application/json');
?>