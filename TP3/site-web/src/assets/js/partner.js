/* eslint-disable no-magic-numbers */
import HTTPManager from './HTTPManager.js';
import SERVER_URL from './consts.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const partnerId = urlParams.get('id');

const httpManager = new HTTPManager(SERVER_URL);

const submitButton = document.getElementById('submit-btn');
const deleteButton = document.getElementById('delete-btn');

// TODO : récupérer le partenaire à travers l'identifiant dans l'URL
document.addEventListener('DOMContentLoaded', async () => {
    if (partnerId) {
        try {
            const partner = await httpManager.get(`/api/partner/${partnerId}`);
            document.getElementById('profile-firstName').textContent = partner.firstName;
            document.getElementById('profile-lastName').textContent = partner.lastName;
            document.getElementById('school').textContent = partner.school;
            document.getElementById('program').textContent = partner.program;

            const reviews = await httpManager.get(`/api/review/${partnerId}`);
            if (reviews && reviews.length > 0) {
                const reviewsContainer = document.getElementById('reviews-list');
                reviewsContainer.innerHTML = "";
                reviews.forEach(review => {
                    reviewsContainer.appendChild(createReviewElement(review));
                });
            }
            else { reviews}
        } catch (error) {
            alert("Une erreur s'est produite lors du chargement des données du partenaire !");
            console.error(error);
        }
    }
});
/*
//  TODO : récupérer les revues pour le partenaire à travers l'identifiant dans l'URL
const reviews = null;

if (reviews) {
    const reviewsContainer = document.getElementById('reviews-list');
    reviewsContainer.innerHTML = "";
    reviews.forEach(review => {
        reviewsContainer.appendChild(createReviewElement(review));
    });
};*/

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const rating = document.getElementById('rate');
    const comment = document.getElementById('comment');
    const author = document.getElementById('author');
    const review = {
        rating: rating.value,
        comment: comment.value,
        author: author.value,
        reviewedPartnerId: partnerId,
        date: new Date().toISOString().slice(0, 10)
    };

    // TODO : Ajouter une nouvelle revue sur le serveur
    // TODO : Rafraichir la page en cas de réussite ou rediriger l'utilisateur vers la page /error.html en cas d'échec
    try {
        await httpManager.post(`/api/review`, review);
        window.alert("Votre revue a été soumise !");
        window.location.reload(); // Refresh the page to show the new review
    } catch (error) {
        alert("Échec de la soumission de la revue !");
        window.location.href = '/error.html';
    }
});

deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // TODO : Supprimer toutes les revues pour le partenaire
    try {
        // Send a DELETE request to the server to delete all reviews for the partner
        const response = await httpManager.delete(`/api/review/${partnerId}`);

        // Check if the response status code is 200 (OK) or 204 (No Content)
        if (response.ok) {
            window.alert("Toutes les revues de l'étudiant ont été supprimées !");
            window.location.reload(); // Reload the page to reflect the changes
        } else {
            // If the server response is not OK, alert the user
            throw new Error(`Échec de la suppression des revues: ${response.status}`);
        }
    } catch (error) {
        // Log the error and alert the user
        console.error("Failed to delete all reviews for the partner:", error);
        alert("Impossible de supprimer les revues tres complete de l'étudiant !");
    }
});

function createReviewElement(review) {
    const parent = document.createElement('div');
    parent.classList.add('review-container');

    const rating = document.createElement('p');
    rating.classList.add('rating');
    rating.textContent = review.rating;
    parent.appendChild(rating);

    const author = document.createElement('p');
    rating.classList.add('author');
    author.textContent = review.author;
    parent.appendChild(author);

    const comment = document.createElement('p');
    comment.classList.add('comment');
    comment.textContent = review.comment;
    parent.appendChild(comment);

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = review.date;
    parent.appendChild(date);

    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = review.likes;
    parent.appendChild(likes);

    const likeBtn = document.createElement('button');
    likeBtn.textContent = '👍';

    // TODO : Envoyer une demande d'incrémentation des "like" de la revue et mettre à jour la vue avec la nouvelle valeur
    // likeBtn.addEventListener('click', async (e) => { });
    // parent.appendChild(likeBtn);

    likeBtn.addEventListener('click', async () => {
        try {
            const updatedReview = await httpManager.post(`/api/review/${review.id}/like`);
            if (updatedReview) {
                likes.textContent = `Likes: ${updatedReview.likes}`;
            }
        } catch (error) {
            console.error("Failed to like review:", error);
        }
    });
    parent.appendChild(likeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener('click', async () => {
        try {
            await httpManager.delete(`/api/reviews/${review.id}`);
            parent.remove(); // Remove the review element from the page
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    });

    // TODO : Supprimer une revue et mettre à jour la vue
    /*
    deleteBtn.addEventListener('click', async (e) => {
        try {
            await httpManager.delete(`/api/partners/${partnerId}/reviews`);
            window.alert("Toutes les revues de l'étudiant ont été supprimées !");
            window.location.reload(); // Refresh the page to reflect the changes
        } catch (error) {
            console.error("Failed to delete all reviews for the partner:", error);
            alert("Impossible de supprimer les revues de l'étudiant !");
        }
     });*/

    parent.appendChild(deleteBtn);

    return parent;
}
