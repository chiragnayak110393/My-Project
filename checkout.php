<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection settings
$host = 'localhost';
$dbname = 'test'; // Change the database name to 'test'
$username = 'root';
$password = '';

// Create a MySQL database connection
$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['submit_order'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $payment = mysqli_real_escape_string($conn, $_POST['payment']);

    // Create a prepared statement
    $insert_query = "INSERT INTO project (name, email, address, payment) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);

    if (mysqli_stmt_prepare($stmt, $insert_query)) {
        // Bind the parameters and execute the query
        mysqli_stmt_bind_param($stmt, 'ssss', $name, $email, $address, $payment);

        if (mysqli_stmt_execute($stmt)) {
            // Redirect or display a success message as needed
            header('location: thank_you.html'); // Redirect to your desired page
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// Close the MySQL connection
mysqli_close($conn);
?>
