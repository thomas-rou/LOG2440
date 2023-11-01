const { randomUUID } = require("crypto");

class PartnerManager {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    /**
     * TODO : Récupérer les partenaires du fichier JSON
     * @returns {Object[]} la liste des partenaires du fichier JSON
     */
    async getPartners() {
        return [];
    }

    /**
     * TODO : Récupérer un partenaire en fonction de son identifiant
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {Object| undefined} le partenaire, si existant
     */
    async getPartner(partnerId) {

        return {todo: 'recupérer le bon partenaire'};
    }

    /**
     * TODO : Ajouter un nouveau partenaire au fichier JSON
     * @param {Object} partner le partenaire à ajouter
     * @returns {Object[]} la liste des partenaires
     */
    async addPartner(partner) {
        partner.id = randomUUID();

        const partners = await this.getPartners();

        return partners;
    }

    /**
     * TODO : Supprimer un partenaire du fichier JSON
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {boolean} true si suppression, false sinon
     */
    async deletePartner(partnerId) {
        return false;
    }
}

module.exports = { PartnerManager };
