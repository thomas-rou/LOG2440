
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
  }

  /**
   * TODO : Ferme la modale du formulaire de création
   */
  closeModalListener() {
  }

  /**
   * TODO : Gère l'événement de la soumission du formulaire.
   * Sauvegarde la nouvelle note et met à jour le rendu de la page
   */
  submitListener() {
    const noteForm = document.getElementById('noteForm');
  }

  /**
   * TODO : Récupère les informations du formulaire et génère un objet Note
   * @returns {Note} la note définie dans le formulaire
   */
  getNoteDetailsFromModal() {
    const title = document.getElementById('noteTitle').value;

    // TODO : Compléter la construction
    return createNoteObject(title);
  }

  /**
   * TODO : Trie les notes dans la page en fonction de l'option choisie dans le menu déroulant
   */
  sortListener() {
  }

  /**
   * TODO : Gère l'événement de click pour la suppression de toutes les notes
   */
  deleteAllListener() {
  }

  /**
   * TODO : Gère les événements de clavier pour les raccourcis "P" et "Delete"
   * Les événements sont ignorés s'il n'y a pas de note sélectionnée
   */
  addKeyBoardEvents() {
  }

  /**
   * TODO : Configure la gestion de la modale et formulaire de création
   */
  manageModal() {
  }

  listenToAllEvents() {
    this.manageModal();
    this.addKeyBoardEvents();
    this.deleteAllListener();
    this.sortListener();
  }
}
