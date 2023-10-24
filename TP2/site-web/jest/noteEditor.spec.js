import NoteEditor from '../src/assets/js/noteEditor.js';
import { jest } from "@jest/globals";

describe("NoteEditor Tests", () => {
  let noteEditor;
  let mockStorageManager;
  // TODO : configurer le tests selon vos besoins

  function buildHTML() {
    const noteContent = document.createElement('div');
    noteContent.id = 'note-content';
    document.body.appendChild(noteContent);
  }

  // TODO : configurer la classe selon vos besoins
  beforeEach(() => {
    buildHTML();

    mockStorageManager = {
      setNotes: jest.fn(),
      populate: jest.fn(),
      getNotes: jest.fn(),
      getNoteById: jest.fn(),
      pinById: jest.fn(),
      deleteNoteById: jest.fn(),
      addNotes: jest.fn(),
      clear: jest.fn(),
      deleteAllNotes: jest.fn(),
      modifyNotesById: jest.fn()
    };
    noteEditor = new NoteEditor(mockStorageManager);
  });

  // TODO : remettre la configuration dans un état valide
  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetAllMocks();
  });

  describe('getNoteIdFromURL', () => {
    it('should return null when URL has no "id" parameter', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { search: '' },
      });
      expect(noteEditor.getNoteIdFromURL()).toBeNull();
    });

    it('should return the "id" parameter from URL', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { search: '?id=testNoteId' },
      });
      // TODO : completer le test
      expect(noteEditor.getNoteIdFromURL()).toBe('testNoteId');
    });
  });

  // TODO : Tester le reste de la classe
  describe('displayNoteDetails', () => {
    it('should display details for a given note', () => {
      const mockNote = {
        id: '12345',
        title: 'Test Note',
        content: 'This is a test note content',
        tags: ['test', 'note', 'exemple']
      };

      // Stub the getNoteById method (assuming this method exists in your real implementation)
      jest.spyOn(noteEditor.storageManager, 'getNoteById').mockReturnValue(mockNote);

      noteEditor.displayNoteDetails('12345');
      const displayedContent = document.getElementById('note-content').textContent;
      expect(displayedContent).toContain(mockNote.content);
    });
  });

  describe('pin', () => {
    it('should pin a note', () => {
      jest.spyOn(noteEditor, 'getNoteIdFromURL').mockReturnValue('12345');
      const pinMock = jest.spyOn(noteEditor.storageManager, 'pinById').mockImplementation();
      noteEditor.pin();
      expect(pinMock).toHaveBeenCalledWith('12345');
      jest.restoreAllMocks();
    });
  });
  describe('delete', () => {
    it('should delete a note', () => {
      jest.spyOn(noteEditor, 'getNoteIdFromURL').mockReturnValue('12345');
      const mockNote = { id: '12345', title: 'Test Note', tags: ['tag1'] };
      jest.spyOn(noteEditor.storageManager, 'getNoteById').mockReturnValue(mockNote);
      const deleteMock = jest.spyOn(noteEditor.storageManager, 'deleteNoteById').mockImplementation();
      global.window.confirm = jest.fn(() => true);
      noteEditor.delete();
      expect(deleteMock).toHaveBeenCalledWith('12345');
      jest.restoreAllMocks();
    });
  });
});
