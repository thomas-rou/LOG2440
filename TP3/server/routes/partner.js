const path = require("path");
const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { FileManager } = require("../managers/fileManager");
const { PartnerManager } = require("../managers/partnerManager");
const { ReviewManager } = require("../managers/reviewManager");

const partnerManager = new PartnerManager(new FileManager(path.join(__dirname + "/../data/partners.json")));

router.get("/", async (request, response) => {
    try {
        const partners = await partnerManager.getPartners();

        if (partners.length !== 0) {
            response.status(HTTP_STATUS.SUCCESS).json(partners);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/* TODO : Ajouter les routes nécessaires pour compléter les fonctionnalitées suivantes :
    - Obtenir un partenaire en fonction de son identifiant
    - Supprimer un partenaire en fonction de son identifiant ET supprimer toutes les revues pour ce partenaire
    - Ajouter un nouveau partenaire
        - Envoyer le nouveau partenaire dans la réponse HTTP
    Note : utilisez les méthodes HTTP et les codes de retour appropriés
*/

module.exports = { router, partnerManager };
