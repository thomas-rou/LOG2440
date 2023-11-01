// TODO : Récupérer les bons éléments des fichiers externes


const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const partnerFirstName = document.getElementById('first-name');
    const partnerLastName = document.getElementById('last-name');

    // TODO : Compléter la création de l'objet du partenaire

    const partner = {
        firstName: partnerFirstName.value,
        lastName: partnerLastName.value,
    };

    // TODO : Ajouter un nouveau partenaire à travers le serveur.
    // TODO : Rediriger l'utilisateur vers index.html en cas de réussite ou /error.html en cas d'échec
    try {
        const response = { firstName : "TODO: Contacter le serveur" };
        if (response) {
            window.alert("L'étudiant avec le nom " + response.firstName + " a été créé !");
            window.location.href = '/add.html';
        }
    } catch (error) {
        alert("Échec de la création du partenaire ! - " + error.message);
        window.location.href = '/add.html';
    }
});
