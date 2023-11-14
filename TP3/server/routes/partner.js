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

/*
 * Obtenir un partenaire en fonction de son identifiant
*/
router.get("/:id", async (request, response) => {
    try {
        const partner = await partnerManager.getPartner(request.params.id);
        if (partner) {
            response.status(HTTP_STATUS.SUCCESS).json(partner);
        } else {
            response.status(HTTP_STATUS.NOT_FOUND).send('Partner not found');
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json({ error: error.message });
    }
});

/*
 * Supprimer un partenaire en fonction de son identifiant ET supprimer toutes les revues pour ce partenaire
*/
router.delete("/:id", async (request, response) => {
    try {
        const deleted = await partnerManager.deletePartner(request.params.id);
        if (deleted) {
            response.status(HTTP_STATUS.SUCCESS).send(true);
        } else {
            response.status(HTTP_STATUS.NOT_FOUND).send(false);
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json({ error: error.message });
    }
});

/*
 * Ajouter un nouveau partenaire
*/
router.post("/", async (request, response) => {
    try {
        const { firstName, lastName, school, program } = request.body;
        if (!firstName || !lastName || !school || !program) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields" });
        }

        const newPartner = await partnerManager.addPartner(request.body);
        response.status(HTTP_STATUS.CREATED).json(newPartner);

    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json({ error: error.message });
    }
});




module.exports = { router, partnerManager };
