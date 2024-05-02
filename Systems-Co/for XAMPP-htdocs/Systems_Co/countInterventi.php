<?php
// Create connection
$conn = mysqli_connect("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Query used to retreive the assisting operations
$query = "SELECT * FROM interventi";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_array($result)){
        $data[] = $row["Id"];
    }
    echo json_encode($data);
} else {
    echo 0;
}

// Debugging SQL queries ==> ?\Volume:\xampp\apache\logs\error.log
error_log("Executing query: " . $query);
if (!$result) {
    die("Error executing query: " . $conn->error);
}

// Close connection
$conn->close();
?>