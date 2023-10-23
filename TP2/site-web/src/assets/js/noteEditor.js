import StorageManager from './storageManager.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteEditor {
  /**
   * TODO : configurer l'attribut de la classe
   * @param {StorageManager} storageManager gestionnaire du LocalStorage
   */
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  /**
   * Récupère l'attribut "id" à partir de l'URL de la page
   * @returns {string | null} l'identifiant de la note
   */
  getNoteIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  /**
   * TODO : Affiche les informations de la note en générant le HTML nécessaire.
   * Si l'id dans l'URL est invalide, affiche "La note demandée n'existe pas."
   * La note est récupéré du LocalStorage
   */
  displayNoteDetails() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);
  
    if (note) {
      const titleElement = document.getElementById('noteTitle');
      const contentElement = document.getElementById('noteContent');
      const tagsElement = document.getElementById('noteTags');
      const colorElement = document.getElementById('noteColor');
      const pinnedElement = document.getElementById('notePinned');
  
      titleElement.value = note.title;
      contentElement.value = note.content;
      tagsElement.value = note.tags.join(', '); // Convertir le tableau d'étiquettes en une seule chaîne
      colorElement.value = note.color;
      pinnedElement.checked = note.pinned;
  
    } else {
      alert("La note demandée n'existe pas.");
    }
  }
  /**
   * TODO : Modifie l'état épinglé de la note et la sauvegarde.
   * Modifie l'affichage de l'état épingé dans la page.
   */

  pin() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);

    if (note) {
      note.pinned = !note.pinned;
      this.storageManager.modifyNoteById(noteId, note.content, note.tags);
      
    }
  }
  /**
   * TODO : Affiche une modale de confirmation.
   * Supprime la note si l'utilisateur confirme et redirige vers la page principale.
   */
  delete() {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette note?");
    if (confirmation) {
      const noteId = this.getNoteIdFromURL();
      this.storageManager.deleteNoteById(noteId);
      window.location.href = './index.html'; // Redirige vers la page principale
    }
  }
}
/**
 * TODO : Ajoute un gestionnaire de click sur le bouton de sauvegarde.
 * Gère la modification de la note en fonction des éléments HTML modifiés dans la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 * @param {StorageManager} storageManager gestionnaire du LocalStorage
 */
function saveChangesByIdListener(noteEditor, storageManager) {
  const saveButton = document.getElementById('save-button');
  const titleElement = document.getElementById('noteTitle');
  const contentElement = document.getElementById('noteContent');
  const tagsElement = document.getElementById('noteTags');
  const colorElement = document.getElementById('noteColor');
  const pinnedElement = document.getElementById('notePinned');

  saveButton.addEventListener('click', () => {
    const noteId = noteEditor.getNoteIdFromURL();
    const newTitle = titleElement.value;
    const newContent = contentElement.value;
    const newTags = tagsElement.value.split(',').map(tag => tag.trim());
    const newColor = colorElement.value;
    const newPinned = pinnedElement.checked;

    storageManager.modifyNoteById(noteId, newTitle, newContent, newTags, newColor, newPinned);
  });
}

/**
 * TODO : Ajoute un gestionnaire pour les événements de clavier pour les raccourcis "P" et "Delete".
 * Les raccourcis sont ignorés si les étiquettes ou le contenu ont le focus de la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 */
function addKeyBoardEvents(noteEditor) {
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
      if (e.key === 'p' || e.key === 'P') {
        noteEditor.pin();
      } else if (e.key === 'Delete') {
        noteEditor.delete();
      }
    }
  });
}


window.onload = () => {
  const storageManager = new StorageManager();
  const noteEditor = new NoteEditor(storageManager);

  noteEditor.displayNoteDetails();

  saveChangesByIdListener(noteEditor, storageManager);
  addKeyBoardEvents(noteEditor);
}
