document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const type = document.getElementById('type').value;
        const message = document.getElementById('message').value;
        
        // Création du lien mailto
        const subject = `Nouveau message de ${name} (${type})`;
        const body = `Message de ${name} (${email}):\n\n${message}`;
        const mailtoLink = `mailto:azoistar10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Ouverture du client de messagerie par défaut
        window.location.href = mailtoLink;
        
        // Réinitialisation du formulaire
        contactForm.reset();
        
        // Affichage d'un message de confirmation
        alert('Merci pour votre message ! Vous allez être redirigé vers votre client de messagerie.');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Vérification du paramètre d'URL pour afficher le message approprié
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    
    if (status === 'success') {
        alert('Votre message a été envoyé avec succès !');
    } else if (status === 'error') {
        alert('Une erreur est survenue lors de l\'envoi du message. ' + (message || 'Veuillez réessayer.'));
    }
}); 