// Configuration
const ADMIN_PASSWORD = '@pCus26{#@-_#'; // À changer !
const STORAGE_KEY = 'restaurantReviews';
const PENDING_KEY = 'pendingReviews';

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    setupEventListeners();
});

// Éléments du DOM
const reviewForm = document.getElementById('reviewForm');
const formMessage = document.getElementById('formMessage');
const reviewsList = document.getElementById('reviewsList');
const filterRating = document.getElementById('filterRating');
const adminPanel = document.getElementById('adminPanel');
const pendingReviews = document.getElementById('pendingReviews');

// Event listeners
function setupEventListeners() {
    if (reviewForm) reviewForm.addEventListener('submit', handleFormSubmit);
    if (filterRating) filterRating.addEventListener('change', filterReviews);
}

// Traiter la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();

    const form = reviewForm || document.getElementById('reviewForm');

    // Récupérer la note sélectionnée (radio)
    const ratingEl = form ? form.querySelector('input[name="rating"]:checked') : document.querySelector('input[name="rating"]:checked');
    const ratingValue = ratingEl ? ratingEl.value : '';

    const review = {
        id: Date.now(),
        name: form?.elements['name']?.value || '',
        email: form?.elements['email']?.value || '',
        rating: ratingValue,
        comment: form?.elements['comment']?.value || '',
        date: new Date().toLocaleDateString('fr-FR'),
        status: 'pending', // pending, approved, rejected
        timestamp: new Date().toISOString()
    };

    // Sauvegarder l'avis en attente de modération
    savePendingReview(review);

    // Afficher le message de succès
    showMessage('Merci ! Votre avis a été reçu et sera publié après modération.', 'success');

    // Réinitialiser le formulaire
    if (form) form.reset();

    // Actualiser la liste des avis
    loadReviews();
}

// Sauvegarder un avis en attente
function savePendingReview(review) {
    let pending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];
    pending.push(review);
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
}

// Sauvegarder un avis approuvé
function saveApprovedReview(review) {
    let reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    reviews.push(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

// Charger les avis
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    displayReviews(reviews);
    updateAdminPanel();
}

// Afficher les avis
function displayReviews(reviews) {
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p>';
        return;
    }

    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card approved">
            <div class="review-header">
                <div>
                    <div class="review-name">${escapeHtml(review.name)}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <div class="review-comment">${escapeHtml(review.comment)}</div>
        </div>
    `).join('');
}

// Filtrer les avis par note
function filterReviews() {
    const rating = filterRating?.value || '';
    let reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (rating) {
        reviews = reviews.filter(r => r.rating == rating);
    }

    displayReviews(reviews);
}

// Afficher les messages
function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `message ${type}`;

    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'message';
    }, 5000);
}

// Connexion Admin
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;

    if (password === ADMIN_PASSWORD) {
        adminPanel.classList.remove('hidden');
        document.getElementById('adminPassword').value = '';
        updateAdminPanel();
    } else {
        alert('Mot de passe incorrect');
    }
}

// Mettre à jour le panneau admin
function updateAdminPanel() {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];

    if (pending.length === 0) {
        if (pendingReviews) pendingReviews.innerHTML = '<p>Aucun avis en attente de modération</p>';
        return;
    }

    if (pendingReviews) {
        pendingReviews.innerHTML = pending.map(review => `
        <div class="review-card pending">
            <div class="review-header">
                <div>
                    <div class="review-name">${escapeHtml(review.name)}</div>
                    <div class="review-date">${review.date}</div>
                    <small>Email: ${escapeHtml(review.email)}</small>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <div class="review-comment">${escapeHtml(review.comment)}</div>
            <div class="review-actions">
                <button class="btn-approve" onclick="approveReview(${review.id})">✓ Approuver</button>
                <button class="btn-reject" onclick="rejectReview(${review.id})">✗ Rejeter</button>
                <button class="btn-delete" onclick="deleteReview(${review.id})">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
    }
}

// Approuver un avis
function approveReview(id) {
    let pending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];
    const review = pending.find(r => r.id === id);

    if (review) {
        review.status = 'approved';
        saveApprovedReview(review);

        pending = pending.filter(r => r.id !== id);
        localStorage.setItem(PENDING_KEY, JSON.stringify(pending));

        updateAdminPanel();
        loadReviews();
        alert('Avis approuvé et publié !');
    }
}

// Rejeter un avis
function rejectReview(id) {
    if (confirm('Êtes-vous sûr de rejeter cet avis ?')) {
        let pending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];
        pending = pending.filter(r => r.id !== id);
        localStorage.setItem(PENDING_KEY, JSON.stringify(pending));

        updateAdminPanel();
        alert('Avis rejeté');
    }
}

// Supprimer un avis
function deleteReview(id) {
    if (confirm('Êtes-vous sûr de supprimer cet avis ?')) {
        let reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        reviews = reviews.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));

        loadReviews();
        alert('Avis supprimé');
    }
}

// Échapper les caractères HTML (sécurité)
function escapeHtml(text) {
    const s = String(text || '');
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return s.replace(/[&<>"']/g, m => map[m]);
}

// Exporter les données (pour sauvegarde)
function exportData() {
    const approved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY)) || [];
    
    const data = {
        approved: approved,
        pending: pending,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avis-restaurant-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Importer des données
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.approved || []));
            localStorage.setItem(PENDING_KEY, JSON.stringify(data.pending || []));
            alert('Données importées avec succès !');
            loadReviews();
        } catch (error) {
            alert('Erreur lors de l\'import des données');
            console.error(error);
        }
    };
    reader.readAsText(file);
}
