<?php
// Configuration du serveur mail
ini_set('SMTP', 'localhost');
ini_set('smtp_port', 25);
ini_set('sendmail_from', 'noreply@ahd-consulting.com');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération et validation des données
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Validation des données
    if (!$name || !$email || !$message) {
        header("Location: index.php?status=error&message=Données invalides");
        exit;
    }
    
    // Destinataire
    $to = "azoistar10@gmail.com";
    
    // Sujet de l'email
    $subject = "Nouveau message de contact depuis le site AHD Consulting";
    
    // En-têtes de l'email
    $headers = array(
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion(),
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/html; charset=UTF-8'
    );
    
    // Construction des en-têtes
    $headers_string = '';
    foreach ($headers as $key => $value) {
        $headers_string .= "$key: $value\r\n";
    }
    
    // Corps de l'email
    $email_content = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 0.9em; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nouveau message de contact</h2>
            </div>
            <div class='content'>
                <p><strong>Nom:</strong> " . htmlspecialchars($name) . "</p>
                <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                <p><strong>Message:</strong></p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
            </div>
            <div class='footer'>
                <p>Message envoyé depuis le formulaire de contact de AHD Consulting</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Envoi de l'email
    try {
        $mail_sent = mail($to, $subject, $email_content, $headers_string);
        
        if ($mail_sent) {
            header("Location: index.php?status=success");
        } else {
            throw new Exception("L'envoi de l'email a échoué");
        }
    } catch (Exception $e) {
        error_log("Erreur d'envoi d'email: " . $e->getMessage());
        header("Location: index.php?status=error&message=" . urlencode($e->getMessage()));
    }
} else {
    header("Location: index.php");
}
?> 