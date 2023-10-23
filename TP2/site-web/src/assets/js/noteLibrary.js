
/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteLibrary {
  noteList = document.getElementById('notes');
  pinnedNoteList = document.getElementById('pinned-notes');
  ascendingValueComparer = 'oldest';
  selectedNote = null;

  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  /**
   * TODO : Génère le code HTML pour une note à afficher à l'écran.
   * Ajoute les gestionnaires de click pour les icônes d'épingle, suppression et détails.
   * Ajoute un gestionnaire de click global sur l'élément pour sélectionner/désélectionner la note
   * @param {Note} note note à afficher
   * @returns {HTMLDivElement} élément div parent de l'affichage pour la note
   */
  createHTMLNote(note) {
    // add main div for note
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.setAttribute('data-id', note.id);
    noteDiv.style.backgroundColor = note.color;

    // add div for id of pinned and unpinned note
    const pinDiv = document.createElement('div');
    if (note.pinned) {
      pinDiv.id = 'pinned-icon-spaces';
    }
    else {
      pinDiv.id = 'unpinned-icon-spaces';
    }
    noteDiv.appendChild(pinDiv);

    // add title of note
    const title = document.createElement('h2');
    title.textContent = note.title;
    pinDiv.appendChild(title);

    // add pin icon
    const pinIcon = document.createElement('i');
    pinIcon.classList.add('fa', 'fa-paperclip', 'pin', 'hidden');
    pinIcon.style.color = 'white';    
    pinDiv.appendChild(pinIcon);

    // add tags
    const tags = document.createElement('p');
    tags.textContent = 'Tags: ' + note.tags;
    noteDiv.appendChild(tags);

    // add date
    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = 'Dernière modification: ' + new Date(note.lastEdit).toLocaleDateString();
    noteDiv.appendChild(date);

    // add delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('delete-button', 'fa', 'fa-trash-o', 'hidden');
    noteDiv.appendChild(deleteIcon);

    // add details icon
    const detailsIcon = document.createElement('i');
    detailsIcon.classList.add('details-button', 'fa', 'fa-info', 'hidden');
    noteDiv.appendChild(detailsIcon);

    // add global click event
    noteDiv.addEventListener('click', () => {
      this.selectNote({
        deleteIcon,
        detailsIcon
      });
    });

    return noteDiv;
  }

  /**
   * Ajoute ou retire la classe 'hidden' aux éléments
   * @param {{deleteIcon: HTMLElement, detailsIcon: HTMLElement}} noteNodeElements contient les icônes de suppression et détails
   *
  */
  selectNote(noteNodeElements) {
    noteNodeElements.deleteIcon.classList.toggle('hidden');
    noteNodeElements.detailsIcon.classList.toggle('hidden');
  }

  /**
   * TODO : Génère le HTML pour toutes les notes dans les 2 listes en fonction de l'attribut "pinned" de chaque note.
   * TODO : Vous NE POUVEZ PAS utiliser une boucle for() classique pour cette fonction
   * @param {Array<Note>} notes notes à afficher dans la page
   */
  generateHTMLNotes(notes) {
    const pinnedNotesDiv = document.getElementById('pinned-notes');
    const unpinnedNotesDiv = document.getElementById('notes');
  
    // Vide les conteneurs existants avant d'ajouter de nouvelles notes.
    pinnedNotesDiv.innerHTML = '';
    unpinnedNotesDiv.innerHTML = '';
  
    notes.forEach(note => {
      const noteDiv = this.createHTMLNote(note);
      if (note.pinned) {
        pinnedNotesDiv.appendChild(noteDiv);
      } else {
        unpinnedNotesDiv.appendChild(noteDiv);
      }
    });    
  } 

  /**
   * TODO : Met à jour les listes des notes affichées dans la page
   * @param {Array<Note>} notes notes à afficher dans la page
   */
  updateListsInterface(notes) {
    this.generateHTMLNotes(notes);
  }

/**
 * Trie les notes selon l'option sélectionnée (du plus récent au plus ancien ou l'inverse).
 * @param {string} order L'ordre de tri, peut être 'newest' ou 'oldest'
 */
sortNotesBy(order) {
  const notes = this.storageManager.getNotes();
  if (order === 'newest') {
      notes.sort((a, b) => new Date(b.lastEdit) - new Date(a.lastEdit));
  } else if (order === 'oldest') {
      notes.sort((a, b) => new Date(a.lastEdit) - new Date(b.lastEdit));
  }
  this.generateHTMLNotes(notes);
}
  /**
   * TODO : Ajoute une note à une des listes.
   * La note est ajoutée au début ou à la fin de la liste en fonction de l'option de tri choisie dans la page
   * @param {Note} note note à ajouter
   * @param {HTMLElement} listElement liste (Notes Épinglées ou Notes) à modifier
   */
  addNoteToList(note, listElement) {
    const noteDiv = this.createHTMLNote(note);
  
  if (this.ascendingValueComparer === 'oldest') {
    // Ajoute la note au début de la liste
    console.warn(`Plus vieux`);
    listElement.insertBefore(noteDiv, listElement.firstChild);
    this.updateListsInterface(listElement);
  } else {
    // Ajoute la note à la fin de la liste
    listElement.appendChild(noteDiv);
    this.updateListsInterface(listElement);
  }

  /**
   * TODO : Supprime une note en fonction de son ID et met à jour la vue
   * @param {string} id identifiant de la note
   */
  deleteNote(id) {
    this.storageManager.deleteNoteById(id);
    const notes = this.storageManager.getNotes();
    this.updateListsInterface(notes);
}


  /**
   * TODO : Modifie l'état épinglé de la note en fonction de son ID et met à jour la vue
   * @param {string} id identifiant de la note
   */
  pinNote(id) {
    this.storageManager.pinById(noteId);
    const notes = this.storageManager.getNotes();
    this.updateListsInterface(notes);
}

  /**
   * TODO : Supprime toutes les notes du site et met à jour la vue
   */
  deleteAll() {
    this.storageManager.deleteAllNotes();
    const notes = this.storageManager.getNotes();
    this.updateListsInterface(notes);
  }
}
