<?php
    //Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
//Alias the League Google OAuth2 provider class
use League\OAuth2\Client\Provider\Google;

//Load Composer's autoloader
require '../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
$dotenv->load();

// Processing form input and constructing message body
$requestBody = file_get_contents('php://input');
parse_str($requestBody, $requestBody);
// foreach ($requestBody as $key => $value) {
//     echo $key.": ".$value." ";
// }
// var_dump($requestBody);

if ($requestBody["messenger"] && $requestBody["nickname"]) {
    $messengerNickname = [
        "messenger" => str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $requestBody["messenger"]),
        "nickname" => str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $requestBody["nickname"])
    ];
}

$email      = str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $requestBody["email"]);
$phone      = str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $requestBody["phone"]);
$message    = str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $requestBody["message"]);

$messageBody = "{$messengerNickname['messenger']}, {$messengerNickname['nickname']}, {$email}, {$phone}, {$message}";

$messageBody = "<html>
                <head>
                <style>
                    body {
                        font-family: Verdana, sans-serif;
                        display: block;
                        color: #282828;
                    }
                    b { display: inline; }
                    h1 { font-family:georgia,garamond,serif;
                        font-size: 30px; }
                    h2 { font-family:Verdana, sans-serif;
                        font-size: 20px; }
                </style>
                </head>
                <body>
                    <h1>Новое сообщение из формы: </h1>
                    <p><b>Мессенджер: </b>{$messengerNickname['messenger']}</p>
                    <p><b>Ник: </b>{$messengerNickname['nickname']}</p>
                    <p><b>Email: </b>{$email}</p>
                    <p><b>Телефон: </b>{$phone}</p>
                    <h2>Сообщение: </h2>
                    <p>{$message}</p>
                </body></html>";
// echo $messageBody;
// echo $messengerNickname["messenger"]."<br>".$messengerNickname["nickname"]."<br>";
// echo $email."<br>";
// echo $phone."<br>";
// echo $message."<br>";

//Create an instance; passing `true` enables exceptions

$mail = new PHPMailer(true); 
$OAUTH_USER_EMAIL    = $_ENV['OAUTH_USER_EMAIL'];
$OAUTH_CLIENT_ID     = $_ENV['OAUTH_CLIENT_ID'];
$OAUTH_CLIENT_SECRET = $_ENV['OAUTH_CLIENT_SECRET'];
$OAUTH_REFRESH_TOKEN = $_ENV['OAUTH_REFRESH_TOKEN'];
// echo $OAUTH_USER_EMAIL    ."<br>";
// echo $OAUTH_CLIENT_ID     ."<br>";
// echo $OAUTH_CLIENT_SECRET ."<br>";
// echo $OAUTH_REFRESH_TOKEN ."<br>";
    
//Server settings
$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
$mail->isSMTP();                                            //Send using SMTP
$mail->CharSet = PHPMailer::CHARSET_UTF8;
$mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
$mail->AuthType = 'XOAUTH2';
// $mail->Username   = $GOOGLE_SMTP_USERNAME;                     //SMTP username
// $mail->Password   = $GOOGLE_SMTP_PASS;                               //SMTP password
// $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
// $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
$mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

// Setting OAuth authentication
$provider = new Google(
    [
        'clientId' => $OAUTH_CLIENT_ID,
        'clientSecret' => $OAUTH_CLIENT_SECRET
    ]
);
$mail->setOAuth(
    new OAuth(
        [
            'provider' => $provider,
            'clientId' => $OAUTH_CLIENT_ID,
            'clientSecret' => $OAUTH_CLIENT_SECRET,
            'refreshToken' => $OAUTH_REFRESH_TOKEN,
            'userName' => $OAUTH_USER_EMAIL,
        ]
        )
    );

//Recipients
$mail->Subject = "Новое сообщение из формы";
$mail->setFrom('mailbot@elegy.studio');
$mail->addAddress('ourmail@elegy.studio');     //Add a recipient
if ($email) {
    $mail->addReplyTo($email);
}

//Content
$mail->isHTML(true);                                  //Set email format to HTML
$mail->Body    = $messageBody;
// $mail->AltBody = $messageBody;

// echo $mail->Body;
// echo $mail->AltBody;
// echo 'Message has been sent';
// send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}

// echo $messageBody.'<br>';
// echo $mail->Body;
    // echo $requestBody["messenger"]."<br>";
    // echo $requestBody["nickname"]."<br>";
    // echo $requestBody["email"]."<br>";
    // echo $requestBody["phone"]."<br>";
    // echo $requestBody["message"]."<br>";
    // // if (!(isset($requestBody["messenger"]) && isset($requestBody["nickname"])) && 
    // //     !isset($requestBody["email"]) && 
    // //     !isset($requestBody["phone"]))
    // //     {
    // //         echo('<script>');
    // //         echo('alert("Please, fill in at least one of the following fields: messenger + nickname, email or phone")');
    // //         echo('</script>');
    // //     }
?>