import HTTPManager from "./HTTPManager.js";
import SERVER_URL from "./consts.js";

// Charge de tous les partenaires du serveur
const httpManager = new HTTPManager(SERVER_URL);
async function loadPartners() {
    try {
        const response = await httpManager.get('/api/partner');
        if (!response || response.length === 0) {
            return await Promise.resolve(null);
        }
        return response;
    } catch (error) {
        console.error("Error loading partners from the server:", error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        const partnersList = await loadPartners();
        generateHTML(partnersList);
    })();
});

const partnersList = await loadPartners();

function generateHTML(partnersList) {
    if (!partnersList) {
        return;
    };
    const partnersContainer = document.getElementById('partners-container');
    partnersContainer.innerHTML = "";
    partnersList.forEach(partner => {
        const partnerHTML = `
        <div class="partner">
            <h3>${partner.firstName}</h3>
            <h3>${partner.lastName}</h3>
            <h4>${partner.school}</h4>
            <a href="partner.html?id=${partner.id}">Voir le profil</a>
        </div>
        `;
        partnersContainer.innerHTML += partnerHTML;
    });
};
generateHTML(partnersList);
