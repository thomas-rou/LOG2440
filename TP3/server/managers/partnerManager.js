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
        const partnersData = await this.fileManager.readFile();
        return JSON.parse(partnersData);
        // return [];
    }

    /**
     * TODO : Récupérer un partenaire en fonction de son identifiant
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {Object| undefined} le partenaire, si existant
     */
    async getPartner(partnerId) {

        const partners = await this.getPartners();
        return partners.find(partner => partner.id === partnerId);
    }

    /**
     * TODO : Ajouter un nouveau partenaire au fichier JSON
     * @param {Object} partner le partenaire à ajouter
     * @returns {Object[]} la liste des partenaires
     */
    async addPartner(partner) {
        partner.id = randomUUID();

        const partners = await this.getPartners();

        partners.push(partner);
        await this.fileManager.writeFile(JSON.stringify(partners, null, 2)); // Save the updated partners array back to the file
        return partner;
    }

    /**
     * TODO : Supprimer un partenaire du fichier JSON
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {boolean} true si suppression, false sinon
     */
    async deletePartner(partnerId) {
        // Delete a partner by their ID
        let partners = await this.getPartners();
        const index = partners.findIndex(partner => partner.id === partnerId);
        if (index === -1) {
            return false; // Partner not found
        }
        partners.splice(index, 1); // Remove the partner from the array
        await this.fileManager.writeFile(JSON.stringify(partners, null, 2)); // Save the updated partners array back to the file
        return true;
    }
}

module.exports = { PartnerManager };
