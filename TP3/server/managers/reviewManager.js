const { randomUUID } = require("crypto");

class ReviewManager {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    /**
     * TODO : Récupérer les revues du fichier JSON
     * @returns {Object[]} la liste des revues du fichier JSON
     */
    async getReviews() {
<<<<<<< HEAD
        const reviewsData = await this.fileManager.readFile();
        return JSON.parse(reviewsData);
        // return [];
=======
        const reviews = await this.fileManager.readFile();
        return JSON.parse(reviews);
>>>>>>> 74cdaa598111e07ed5e11b49134b233cf28e85e8
    }

    /**
     * TODO : Rcupérer les revues pour un partenaire spécifique
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {Object[]} la liste des revues pour un partenaire donné
     */
    async getReviewsForPartner(partnerId) {
        const reviews = await this.getReviews();
<<<<<<< HEAD
        return reviews.filter(review => review.reviewedPartnerId === partnerId);
        // return {todo: 'recupérer la bonne revue'};
=======
        return reviews.filter((review) => review.reviewedPartnerId === partnerId);
>>>>>>> 74cdaa598111e07ed5e11b49134b233cf28e85e8
    }

    /**
     * TODO : Ajouter une nouvelle revue au fichier JSON
     * @param {Object} review la revue à ajouter
     * @returns {Object[]} la nouvelle liste de revues
     */
    async addReview(review) {
        // ID généré aléatoirement
        review.id = randomUUID();

        const reviews = await this.getReviews();
        reviews.push(review);
        await this.fileManager.writeFile(JSON.stringify(reviews, null, 2));
       
        return reviews;
    }

    /**
     * TODO : Incrémenter le compter de "likes" d'une revue et mettre à jour le fichier
     * @param {string} reviewId identifiant de la revue
     * @returns {boolean} true si la revue existe, false sinon
     */
    async likeReview(reviewId) {
       // Increment the like count for the specified review
       const reviews = await this.getReviews();
       const review = reviews.find(r => r.id === reviewId);
       if (review) {
           review.likes = (review.likes || 0) + 1;
           // Save the updated reviews back to the file
           await this.fileManager.writeFile(JSON.stringify(reviews, null, 2));
           return true;
       }
       return false;
    }

    /**
     * Supprime les revues en fonction d'un prédicat
     * @example
     * // récupère toutes les révues pour un partenaire spécifique
     * const predicate = (review) => review.reviewedPartnerId === partnerId)
     * @param {Function} predicate fonction qui détermine le critère de filtre pour les revues à supprimer
     * @returns {boolean} true si des revues ont été supprimés, false sinon
     */
    async deleteReviewsMatchingPredicate(predicate) {
        const reviews = await this.getReviews();

        const remainingReviews = reviews.filter((review) => !predicate(review));

        await this.fileManager.writeFile(JSON.stringify(remainingReviews, null, 2));

        return remainingReviews.length !== reviews.length;
    }
}

module.exports = { ReviewManager };
