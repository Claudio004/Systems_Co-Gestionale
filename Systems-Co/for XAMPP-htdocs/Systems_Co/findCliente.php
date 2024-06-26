<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve login data sent from React
$data = file_get_contents('php://input');

$cliente = $data;

// Prepare SQL statement
$stmt = $conn->prepare("SELECT * FROM committenti WHERE nome = ?");
$stmt->bind_param("s", $cliente);

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if there is a matching name
if ($result->num_rows > 0) {
    // Authentication successful
    while($row = mysqli_fetch_array($result)){
        $response[] = array('id' => $row["Id"], 'nome' => $row["Nome"], 'city' => $row["Città"], 'indirizzo' => $row["Via"], 'CAP' => $row["CAP"], 'Telefono' => $row["Telefono"], 'Email'  => $row["email"]);
    }
} else {
    // Authentication failed
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