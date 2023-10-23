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
    const editableNote = this.storageManager.getNoteById(noteId);

    const detailDiv = document.getElementById('note-content');
    detailDiv.innerHTML = '';

    if (!editableNote) {
      const errorMessage = document.createElement('h2');
      errorMessage.id = 'error-message';
      errorMessage.textContent = "La note demandée n'existe pas.";
      detailDiv.appendChild(errorMessage);
    }
    else {
      //Note Title
      const detailTitle = document.createElement('h2');
      detailTitle.id = 'note-title';
      detailTitle.textContent = editableNote.title;
      detailDiv.appendChild(detailTitle);

      //Note date
      const detailDate = document.createElement('p');
      detailDate.id = 'note-date';
      detailDate.classList.add('date');
      detailDate.textContent = 'Dernière modification: ' + new Date(editableNote.lastEdit).toLocaleDateString();
      detailDiv.appendChild(detailDate);

      //Editable Note tags
      const detailTags = document.createElement('p');
      detailTags.id = 'note-tags';
      detailTags.textContent = 'Tags: ';
      const textTags = document.createElement('span');
      textTags.id = 'tags';
      textTags.contentEditable = true;
      textTags.textContent = editableNote.tags;
      detailTags.appendChild(textTags);
      detailDiv.appendChild(detailTags);

      //Note color + background of the text only same as color
      const detailColor = document.createElement('p');
      detailColor.id = 'note-color';
      detailColor.textContent = 'Couleur: ' ;
      const textColored = document.createElement('span');
      textColored.id = 'text-colored';
      textColored.textContent = editableNote.color;
      textColored.style.backgroundColor = editableNote.color;
      detailColor.appendChild(textColored);
      detailDiv.appendChild(detailColor);

      //Note pin status
      const detailPin = document.createElement('p');
      detailPin.id = 'note-pin';
      detailPin.textContent = 'Épinglé: ' + editableNote.pinned;
      detailDiv.appendChild(detailPin);

      //Editable Note content in <textarea>
      const detailContent = document.createElement('textarea');
      detailContent.id = 'noteContent';
      detailContent.textContent = editableNote.content;
      detailDiv.appendChild(detailContent);
    }
  }

  /**
   * TODO : Modifie l'état épinglé de la note et la sauvegarde.
   * Modifie l'affichage de l'état épingé dans la page.
   */
  pin() {
    const noteId = this.getNoteIdFromURL();
    this.storageManager.pinById(noteId);
    this.displayNoteDetails();
  }

  /**
   * TODO : Affiche une modale de confirmation.
   * Supprime la note si l'utilisateur confirme et redirige vers la page principale.
   */
  delete() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer la note "${note.title}" ?`;
    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      this.storageManager.deleteNoteById(noteId);
      window.location.href = 'index.html';
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
  const contentElement = document.getElementById('noteContent');

  saveButton.addEventListener('click', () => {
    const noteId = noteEditor.getNoteIdFromURL();
    const modifiedContent = contentElement.value;
    const modifiedTags = document.getElementById('tags').textContent;

    storageManager.modifyNoteById(noteId, modifiedContent, modifiedTags);
  });
}

/**
 * TODO : Ajoute un gestionnaire pour les événements de clavier pour les raccourcis "P" et "Delete".
 * Les raccourcis sont ignorés si les étiquettes ou le contenu ont le focus de la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 */
function addKeyBoardEvents(noteEditor) {
  // add event listener for keyup event for delete using the delete key
  document.addEventListener('keyup', (event) => {
    if (event.code === 'Delete' && event.target.nodeName !== 'TEXTAREA' && event.target.isContentEditable === false) {
      noteEditor.delete();
    }
  });
  // add event listener for keyup event for pin using the p key if note writing in textarea
  document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyP' && event.target.nodeName !== 'TEXTAREA' && event.target.isContentEditable === false) {
      noteEditor.pin();
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
