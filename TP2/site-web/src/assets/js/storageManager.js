import notes from './defaultData.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class StorageManager {
  STORAGE_KEY_NOTES = 'notes';

  /**
   * Fonction utilitaire pour remplir le storage avec des valeurs par défauts
   * NOTE : CECI EST FOURNI POUR VOUS AIDER AVEC LE CODE DE DÉPART
   * CETTE FONCTION NE DOIT PAS ÊTRE APPELÉE À LA REMISE FINALE
   */
  populate() {
    if (!this.getNotes() || this.getNotes().length === 0) {
      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
    }
  }

  /**
   * TODO : Récupère toutes les notes du Storage ou un tableau vide
   * @returns {Array<Note>} les notes du storage
   */
  getNotes() {
    const notesJSON = localStorage.getItem('notes');
    if (notesJSON) {
      return JSON.parse(notesJSON);
    } else {
      return [];
    }
  }

  /**
   * TODO : Récupère une note en fonction de son ID
   * @param {string} id identifiant de la note
   * @returns {Note | undefined} la note si trouvée
   */
  getNoteById(id) {
    const notes = this.getNotes();
    const noteById = notes.find(note => note.id === id);
    return noteById || null;
  }

  /**
   * TODO : Ajoute des notes au storage
   * @param {Array<Note>} notesArray tableau de notes à ajouter
   */
  setNotes(notesArray) {
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  /**
   * Ajoute une nouvelle note au Storage
   * @param {Note} note note à ajouter
   */
  addNote(note) {
    const notes = this.getNotes();
    notes.push(note);
    this.setNotes(notes);
  }

  /**
   * TODO : Supprime une note en fonction de son ID
   * @param {string} id identifiant de la note
   */
  deleteNoteById(id) {
    const currentNotes = this.getNotes();
    const updateNotes = currentNotes.filter((note) => note.id !== id);
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(updateNotes));
  }

  clear() {
    this.deleteAllNotes();
  }

  /**
   * TODO : Supprime toutes les notes du storage
   */
  deleteAllNotes() {
    localStorage.removeItem('notes');
  }

  /**
   * TODO : Modifie une note en fonction de son ID
   * @param {string} id identifiant de la note
   * @param {string} content contenu de la note
   * @param {string[]} tags étiquettes de la note
   */
  modifyNoteById(id, content, tags) {
    const notes = this.getNotes();
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          content,
          tags,
          lastEdit: new Date()
        };
      }
      return note;
    });
    this.setNotes(updatedNotes);
  }

  /**
   * TODO : Modifie l'état épinglé de la note en fonction de son ID
   * @param {string} id identifiant de la note
   */
  pinById(id) {
    const notes = this.getNotes();
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          pinned: !note.pinned
        };
      }
      return note;
    });
    this.setNotes(updatedNotes);
  }
}
