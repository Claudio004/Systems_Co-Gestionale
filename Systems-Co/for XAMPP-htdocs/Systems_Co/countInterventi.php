<?php
$conn = mysqli_connect("localhost", "root", "", "db_systems");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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

$conn->close();
?>