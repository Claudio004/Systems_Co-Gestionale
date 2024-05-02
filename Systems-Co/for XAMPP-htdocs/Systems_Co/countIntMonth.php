<?php
// Create connection
$conn = mysqli_connect("localhost", "root", "", "db_systems");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query used to retreive the assisting operations during the current year
$query = "SELECT COUNT(i.Id) MonthTotal, MONTH(i.dataIntervento) AS Month from interventi as i where YEAR(i.DataIntervento) = YEAR(CURDATE()) GROUP BY MONTH(i.DataIntervento)";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_array($result)){
        switch ($row["Month"]){
            case '1':
                $month = "Gennaio";
                break;
            case '2':
                $month = "Febbraio";
                break;
            case '3':
                $month = "Marzo";
                break;
            case '4':
                $month = "Aprile";
                break;
            case '5':
                $month = "Maggio";
                break;
            case '6':
                $month = "Giugno";
                break;
            case '7':
                $month = "Luglio";
                break;
            case '8':
                $month = "Agosto";
                break;
            case '9':
                $month = "Settembre";
                break;
            case '10':
                $month = "Ottobre";
                break;
            case '11':
                $month = "Novrembre";
                break;
            case '12':
                $month = "Dicembre";
                break;
        }
        $data[] = [$row["MonthTotal"], $month];
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