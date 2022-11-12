<?php
    //Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
$dotenv->load();

$GOOGLE_SMTP_USERNAME = $_ENV['GOOGLE_SMTP_USERNAME'];
$GOOGLE_SMTP_PASS = $_ENV['GOOGLE_SMTP_PASS'];

if ($_POST["messenger"] && $_POST["nickname"]) {
    $messengerNickname = [
        "messenger" => str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $_POST["messenger"]),
        "nickname" => str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $_POST["nickname"])
    ];
}

$email = str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $_POST["email"]);
$phone = str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $_POST["phone"]);
$message = str_replace(array("&", "<", ">"), array("&amp;", "&lt;", "&gt;"), $_POST["message"]);

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
                        font-size: 50px;
                        text-decoration: underline; }
                    h2 { font-family:Verdana, sans-serif;
                        font-size: 30px; }
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
echo $messageBody;
// echo $messengerNickname["messenger"]."<br>".$messengerNickname["nickname"]."<br>";
// echo $email."<br>";
// echo $phone."<br>";
// echo $message."<br>";

//Create an instance; passing `true` enables exceptions

class Mailer extends PHPMailer { 
    public static function sendMail($email, $messengerNickname, $phone, $message) {
        $mail = new PHPMailer(true);   
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->CharSet = "UTF-8";
            $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = $GOOGLE_SMTP_USERNAME;                     //SMTP username
            $mail->Password   = $GOOGLE_SMTP_PASS;                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('mailbot@elegy.studio');
            $mail->addAddress('ourmail@elegy.studio');     //Add a recipient
            if ($email) {
                $mail->addReplyTo($email);
            }

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            // $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}

// Mailer::sendMail();
    // echo $_POST["messenger"]."<br>";
    // echo $_POST["nickname"]."<br>";
    // echo $_POST["email"]."<br>";
    // echo $_POST["phone"]."<br>";
    // echo $_POST["message"]."<br>";
    // // if (!(isset($_POST["messenger"]) && isset($_POST["nickname"])) && 
    // //     !isset($_POST["email"]) && 
    // //     !isset($_POST["phone"]))
    // //     {
    // //         echo('<script>');
    // //         echo('alert("Please, fill in at least one of the following fields: messenger + nickname, email or phone")');
    // //         echo('</script>');
    // //     }
?>