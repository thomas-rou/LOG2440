import NoteLibrary from './noteLibrary.js';
import StorageManager from './storageManager.js';
import MainPageEventsController from './mainPageEventsController.js';

window.onload = () => {
  const storageManager = new StorageManager();
  const noteLibrary = new NoteLibrary(storageManager);
  const controller = new MainPageEventsController(noteLibrary);
  const notes = storageManager.getNotes();
  noteLibrary.generateHTMLNotes(notes);
  controller.listenToAllEvents();
};
