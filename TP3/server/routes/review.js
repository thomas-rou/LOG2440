const path = require("path");
const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { FileManager } = require("../managers/fileManager");
const { ReviewManager } = require("../managers/reviewManager");

const reviewManager = new ReviewManager(new FileManager(path.join(__dirname + "/../data/reviews.json")));

router.get("/", async (request, response) => {
    try {
        const reviews = await reviewManager.getReviews();

        if (reviews.length !== 0) {
            response.status(HTTP_STATUS.SUCCESS).json(reviews);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

router.get("/:partnerId", async (request, response) => {
    try {
        const reviews = await reviewManager.getReviewsForPartner(request.params.partnerId);

        if (reviews.length !== 0) {
            response.status(HTTP_STATUS.SUCCESS).json(reviews);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/* Ajouter les routes nécessaires pour compléter les fonctionnalitées suivantes :
    - Incrémenter le compteur de "likes" d'une revue en fonction de son identifiant
    - Supprimer une revue en fonction de son identifant
    - Ajouter une nouvelle revue seulement après avoir validé que tous les éléments nécessaires sont envoyés
        - Envoyer la nouvelle revue dans la réponse HTTP
    Note : utilisez les méthodes HTTP et les codes de retour appropriés
*/

/**
 * Route incrémenter le compteur de "likes" d'une revue en fonction de son identifiant
 */
router.patch("/:reviewId", async (request, response) => {
    try {
        const changes = await reviewManager.likeReview(request.params.reviewId, request.body.content);

        if (changes) {
            response.status(HTTP_STATUS.SUCCESS).json(changes);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/**
 * Route supprimer une revue en fonction de son identifant
 */
router.delete("/:reviewId", async (request, response) => {
    try {
        const predicate = (review) => review.id === request.params.reviewId;
        const deleted = await reviewManager.deleteReviewsMatchingPredicate(predicate);

        if (deleted) {
            response.status(HTTP_STATUS.SUCCESS).json(deleted);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

/**
 * Route ajouter une nouvelle revue seulement après avoir validé que tous les éléments nécessaires sont envoyés
 */
router.post("/", async (request, response) => {
    const review = request.body;
    try {
        if (!review.reviewedPartnerId || !review.author || !review.comment || !review.rating) {
            response.status(HTTP_STATUS.BAD_REQUEST).send('Missing required fields');
            return;
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
    try {
        const newReview = await reviewManager.addReview(review);
        if (newReview) {
            response.status(HTTP_STATUS.SUCCESS).json(newReview);
        } else {
            response.status(HTTP_STATUS.NO_CONTENT).send();
        }
    } catch (error) {
        response.status(HTTP_STATUS.SERVER_ERROR).json(error);
    }
});

module.exports = { router, reviewManager };
