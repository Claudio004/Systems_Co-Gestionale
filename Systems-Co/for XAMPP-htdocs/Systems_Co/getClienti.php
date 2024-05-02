<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement
$stmt = $conn->prepare("SELECT * FROM committenti");

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if there is a matching name
if ($result->num_rows > 0) {
    // Authentication successful
    while($row = mysqli_fetch_array($result)){
        $response[] = array('id' => $row["Id"], 'nome' => $row["Nome"], 'city' => $row["Città"], 'indirizzo' => $row["Via"], 'CAP' => $row["CAP"], 
        'Telefono' => $row["Telefono"], 'Email'  => $row["email"]);
    }
} else {
    // Authentication failed
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