<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve login data sent from React
$data = json_decode(file_get_contents('php://input'), true);

$matricola = $data['matricola'];
$password = $data['password'];

// Prepare SQL statement
$stmt = $conn->prepare("SELECT * FROM dipendenti WHERE matricola = ? AND password = ?");
$stmt->bind_param("ss", $matricola, $password);

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if there is a matching user
if ($result->num_rows > 0) {
    // Authentication successful
    $response = array('success' => true, 'message' => 'Login successful');
} else {
    // Authentication failed
    $response = array('success' => false, 'message' => 'Invalid username or password');
}

// Close prepared statement
$stmt->close();

// Close connection
$conn->close();

// Send response back to React
header('Content-Type: application/json');
echo json_encode($response);
?>