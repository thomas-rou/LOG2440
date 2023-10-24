
import { createNoteObject } from './utils.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class MainPageEventsController {
  constructor(noteLibrary) {
    this.noteLibrary = noteLibrary;
  }

  /**
   * TODO : Ouvre la modale du formulaire de création
   */
  openModalListener() {
    const createNoteButton = document.getElementById('createNoteButton');
    const modal = document.getElementById('createNoteModal');
    createNoteButton.addEventListener('click', () => {
      modal.showModal();
    });
  }

  /**
   * TODO : Ferme la modale du formulaire de création
   */
  closeModalListener() {
    const closeButton = document.getElementById('closeModal');
    const modal = document.getElementById('createNoteModal');
    closeButton.addEventListener('click', () => {
      modal.close();
    });
  }

  /**
   * TODO : Gère l'événement de la soumission du formulaire.
   * Sauvegarde la nouvelle note et met à jour le rendu de la page
   */
  submitListener() {
    const noteForm = document.getElementById('noteForm');
    noteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newNote = this.getNoteDetailsFromModal();
      this.noteLibrary.storageManager.addNote(newNote);
      const noteDiv = this.noteLibrary.createHTMLNote(newNote);
      const sortOrder = document.getElementById('sort-order').value;
      if (newNote.pinned) {
        if (sortOrder === 'newest') {
          this.noteLibrary.pinnedNoteList.insertBefore(noteDiv, this.noteLibrary.pinnedNoteList.firstChild);
        } else {
          this.noteLibrary.pinnedNoteList.appendChild(noteDiv);
        }
      } else {
        if (sortOrder === 'newest') {
          this.noteLibrary.noteList.insertBefore(noteDiv, this.noteLibrary.noteList.firstChild);
        } else {
          this.noteLibrary.noteList.appendChild(noteDiv);
        }
      }
      document.getElementById('createNoteModal').close();
    });
  }

  /**
   * TODO : Récupère les informations du formulaire et génère un objet Note
   * @returns {Note} la note définie dans le formulaire
   */
  getNoteDetailsFromModal() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const tags = document.getElementById('noteTags').value.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => ` ${tag}`)
      .join(',').trim()
    const color = document.getElementById('noteColor').value;
    const pinned = document.getElementById('notePinned').checked;

    return createNoteObject(title, content, tags, color, pinned);
  }

  /**
   * TODO : Trie les notes dans la page en fonction de l'option choisie dans le menu déroulant
   */
  sortListener() {
    const sortOrder = document.getElementById('sort-order');
    sortOrder.addEventListener('change', (e) => {
      this.noteLibrary.sortNotesBy(e.target.value);
    });
  }

  /**
   * TODO : Gère l'événement de click pour la suppression de toutes les notes
   */
  deleteAllListener() {
    const deleteAllButton = document.getElementById('delete-all-button');
    deleteAllButton.addEventListener('click', () => {
      this.noteLibrary.deleteAll();
    });
  }

  /**
   * fonction qui s'occupe des évènement sur les "details-button" il change la page selon le id de la note sélectionner
   */
  detailsListener() {
    const detailsButtons = document.querySelectorAll('.details-button');
    detailsButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const note = this.noteLibrary.storageManager.getNoteById(e.target.parentElement.getAttribute('data-id'));
        window.location.href = 'detail.html' + '?' + 'id=' + note.id;
      });
    });
  }

  /**
   * fonction qui s'occupe des évènement sur les "delete-button"
   * il appelle la fonction deleteNote de NoteLibrary qui elle appelle celle du localStorage
   */
  deleteListener() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const noteId = e.target.parentElement.getAttribute('data-id');
        this.noteLibrary.deleteNote(noteId);
      });
    });
  }

  /**
   * fonction qui s'occupe des évènement sur les "fa-paperclip.pin"  appelle la fonction pinById du storageManager
   */
  pinListener() {
    const pinIcons = document.querySelectorAll('.fa-paperclip.pin');
    pinIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        const noteId = e.target.closest('.note').getAttribute('data-id');
        this.noteLibrary.storageManager.pinById(noteId);
        this.noteLibrary.updateListsInterface(this.noteLibrary.storageManager.getNotes());
      });
    });
  }

  /**
   * TODO : Gère les événements de clavier pour les raccourcis "P" et "Delete"
   * Les événements sont ignorés s'il n'y a pas de note sélectionnée
   */
  addKeyBoardEvents() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'P') {
        const notes = document.querySelectorAll('.note');
        notes.forEach(note => {
          const hiddenElement = note.querySelector('.details-button.hidden');
          if (!hiddenElement) {
            const noteId = note.getAttribute('data-id');
            this.noteLibrary.storageManager.pinById(noteId);
            this.noteLibrary.updateListsInterface(this.noteLibrary.storageManager.getNotes());
          }
        });
      } else if (event.key === 'Delete') {
        const notes = document.querySelectorAll('.delete-button.note');
        notes.forEach(note => {
          const hiddenElement = note.querySelector('.hidden');
          if (!hiddenElement) {
            const noteId = note.getAttribute('data-id');
            this.noteLibrary.storageManager.deleteNoteById(noteId);
            this.noteLibrary.updateListsInterface(this.noteLibrary.storageManager.getNotes());
          }
        });
      }
    });
  }

  /**
   * TODO : Configure la gestion de la modale et formulaire de création
   */
  manageModal() {
    this.openModalListener();
    this.closeModalListener();
    this.submitListener();
  }

  listenToAllEvents() {
    this.manageModal();
    this.addKeyBoardEvents();
    this.deleteAllListener();
    this.sortListener();
    this.detailsListener();
    this.deleteListener();
    this.pinListener();
  }
}
