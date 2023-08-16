<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$email_subject = "New Form Submission";
$email_body =  "User Name: $name.\n".
               "User Email: $email.\n".
               "User Message: $message.\n";

$to = "lazonikitovic@gmail.com";
$headers = "New email from $email \r\n";

mail($to, $email_subject, $email_body, $headers);
?>