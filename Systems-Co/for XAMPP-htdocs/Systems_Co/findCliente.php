<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data sent from React
$data = json_decode(file_get_contents('php://input'), true);

// Debugging retreive data  ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Received data: " . print_r($data, true));
if ($data === null) {
    die("Error decoding JSON data");
}

$cliente = $data['cliente'];

// Prepare SQL statement
$stmt = $conn->prepare("SELECT id,nome, FROM committenti WHERE nome = ?");
$stmt->bind_param("ss", $cliente);

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if there is a matching name
if ($result->num_rows > 0) {
    // Successful check
    while($row = mysqli_fetch_array($result)){
        $response[] = array('id' => $row["Id"], 'nome' => $row["Nome"], 'city' => $row["Città"], 'indirizzo' => $row["Via"], 'CAP' => $row["CAP"], 
        'Telefono' => $row["Telefono"], 'Email'  => $row["email"]);
    }
} else {
    // Failed check
    $response = array('Error' => "No entry found for this name");
}

// Debugging SQL queries ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Executing query: " . $query);
if (!$result) {
    die("Error executing query: " . $conn->error);
}

// Close prepared statement
$stmt->close();

// Close connection
$conn->close();

// Send response back to React
header('Content-Type: application/json');
echo json_encode($response);
?>