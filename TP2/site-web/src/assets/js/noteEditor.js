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
  }

  /**
   * TODO : Modifie l'état épinglé de la note et la sauvegarde.
   * Modifie l'affichage de l'état épingé dans la page.
   */
  pin() {
  }

  /**
   * TODO : Affiche une modale de confirmation.
   * Supprime la note si l'utilisateur confirme et redirige vers la page principale.
   */
  delete() {
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
  const contentElement = document.getElementById('noteContent');
}

/**
 * TODO : Ajoute un gestionnaire pour les événements de clavier pour les raccourcis "P" et "Delete".
 * Les raccourcis sont ignorés si les étiquettes ou le contenu ont le focus de la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 */
function addKeyBoardEvents(noteEditor) {
}

window.onload = () => {
  const storageManager = new StorageManager();
  const noteEditor = new NoteEditor(storageManager);

  noteEditor.displayNoteDetails();

  saveChangesByIdListener(noteEditor, storageManager);
  addKeyBoardEvents(noteEditor);
}
