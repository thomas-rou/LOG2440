/* eslint-disable no-magic-numbers */
import HTTPManager from './HTTPManager.js';
import SERVER_URL from './consts.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const partnerId = urlParams.get('id');

const httpManager = new HTTPManager(SERVER_URL);

const submitButton = document.getElementById('submit-btn');
const deleteButton = document.getElementById('delete-btn');

// Récupérer le partenaire à travers l'identifiant dans l'URL
document.addEventListener('DOMContentLoaded', () => {
    (async () => {
    if (partnerId) {
        try {
            const partner = await httpManager.get(`/api/partner/${partnerId}`);
            document.getElementById('profile-firstName').textContent = partner.firstName;
            document.getElementById('profile-lastName').textContent = partner.lastName;
            document.getElementById('school').textContent = partner.school;
            document.getElementById('program').textContent = partner.program;

            // Récupérer les revues pour le partenaire à travers l'identifiant dans l'URL const reviews = null
            const reviews = await httpManager.get(`/api/review/${partnerId}`);
            if (reviews && reviews.length >= 0) {
                const reviewsContainer = document.getElementById('reviews-list');
                reviewsContainer.innerHTML = "";
                reviews.forEach(review => {
                    reviewsContainer.appendChild(createReviewElement(review));
                });
            } else {
                throw new Error('réponse inattendue du serveur');
            }
        } catch (error) {
            alert("Une erreur s'est produite lors du chargement des données du partenaire !");
        }
    }
    })();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    (async () => {
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

    // Ajouter une nouvelle revue sur le serveur
    // Rafraichir la page en cas de réussite ou rediriger l'utilisateur vers la page /error.html en cas d'échec
    try {
        await httpManager.post(`/api/review`, review);
        window.alert("Votre revue a été soumise !");
        window.location.reload();
    } catch (error) {
        alert("Échec de la soumission de la revue !");
        window.location.href = '/error.html';
    }
    })();
});

deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    (async () => {
    // Supprimer toutes les revues pour le partenaire
    try {
        const response = await httpManager.delete(`/api/partner/${partnerId}`);

        if (response === true) {
            window.alert("Toutes les revues de l'étudiant ont été supprimées !");
            window.location.href = '/index.html';
        } else {
            throw new Error('réponse inattendue du serveur');
        }
    } catch (error) {
        alert("Impossible de supprimer les revues de l'étudiant !");
        window.location.href = '/error.html';
    }
    })();
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

    // Envoyer une demande d'incrémentation des "like" de la revue et mettre à jour la vue avec la nouvelle valeur

    likeBtn.addEventListener('click', () => {
        (async () => {
        try {
            const updatedReview = await httpManager.patch(`/api/review/${review.id}`);
            if (updatedReview) {
                window.location.reload();
            }
        } catch (error) {
            alert("Échec de l'incrémentation des likes !");
        }
        })();
    });
    parent.appendChild(likeBtn);

    // Supprimer une revue et mettre à jour la vue
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener('click', () => {
        (async () => {
        try {
            await httpManager.delete(`/api/review/${review.id}`);
            parent.remove();
        } catch (error) {
            alert("Échec de la suppression de la revue !");
        }
        })();
    });

    parent.appendChild(deleteBtn);

    return parent;
}
