<?php
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    exit("<script>window.location=\"/\";");
}
// configure
$from = trim(filter_input(INPUT_POST,"email",FILTER_SANITIZE_EMAIL));//Validation should be done on the front end, sanitation on the backend
$name = trim(filter_input(INPUT_POST,"name",FILTER_SANITIZE_STRING));
$sendTo = 'hello@whiteblock.io'; 
$subject = trim(filter_input(INPUT_POST,"subject",FILTER_SANITIZE_STRING));
$message = trim(filter_input(INPUT_POST,"message",FILTER_SANITIZE_STRING));
$message = wordwrap($message, 70, "\r\n");


$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';
$errorMessage = 'There was an error while submitting the form. Please try again later';

// let's do the sending

try{

    
    $headers = array('Content-Type: text/plain; charset="UTF-8"',
        "To: ",
        "From: ${from}",
        "Reply-To: ${from}",
        "Return-Path: ${from}"
    );
    
    mail($sendTo, $subject, $message, implode("\r\n", $headers));//RFC 2822

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e){
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    exit($encoded);
}
    //echo $responseArray['message'];
    exit("<script>
        alert(\"Success\");
        window.location = \"/\";


        </script>");

