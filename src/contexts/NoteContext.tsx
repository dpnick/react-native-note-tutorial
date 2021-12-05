import { Note, NoteColors } from '@models/note';
import { StorageKeys } from '@models/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Alert } from 'react-native';

interface INoteContext {
  notes: Note[] | undefined;
  selectedNote: Note | undefined;
  selectNote: (id?: number) => void;
  deleteNote: (id: number) => void;
  createNote: (title: string, content: string) => void;
  updateNote: (id: number, title: string, content: string) => void;
  updateNoteColor: (id: number, color: NoteColors) => void;
}

const NoteContext = createContext<INoteContext>({
  notes: undefined,
  selectedNote: undefined,
  selectNote: () => {},
  deleteNote: () => {},
  createNote: () => {},
  updateNote: () => {},
  updateNoteColor: () => {},
});

export function useNote() {
  return useContext(NoteContext);
}

enum NoteActionTypes {
  LOAD_NOTES = 'load-notes',
  SELECT_NOTE = 'select-note',
  DELETE_NOTE = 'delete-note',
  CREATE_NOTE = 'create-note',
  UPDATE_NOTE = 'update-note',
  UPDATE_NOTE_COLOR = 'update-note-color',
}

type NoteAction =
  | { type: NoteActionTypes.LOAD_NOTES; payload: { notes: Note[] } }
  | { type: NoteActionTypes.SELECT_NOTE; payload: { id: number | undefined } }
  | { type: NoteActionTypes.DELETE_NOTE; payload: { notes: Note[] } }
  | { type: NoteActionTypes.CREATE_NOTE; payload: { note: Note } }
  | { type: NoteActionTypes.UPDATE_NOTE; payload: { notes: Note[] } }
  | { type: NoteActionTypes.UPDATE_NOTE_COLOR; payload: { notes: Note[] } };

interface NoteState {
  notes: Note[] | undefined;
  selectedId: number | undefined;
}

const loadNotes = (notes: Note[]): NoteAction => {
  return {
    type: NoteActionTypes.LOAD_NOTES,
    payload: {
      notes,
    },
  };
};

const selectNote = (id?: number): NoteAction => {
  return {
    type: NoteActionTypes.SELECT_NOTE,
    payload: {
      id,
    },
  };
};

const deleteNote = (notes: Note[]): NoteAction => {
  return {
    type: NoteActionTypes.DELETE_NOTE,
    payload: {
      notes,
    },
  };
};

const createNote = (note: Note): NoteAction => {
  return {
    type: NoteActionTypes.CREATE_NOTE,
    payload: {
      note,
    },
  };
};

const updateNote = (notes: Note[]): NoteAction => {
  return {
    type: NoteActionTypes.UPDATE_NOTE,
    payload: {
      notes,
    },
  };
};

const updateNoteColor = (notes: Note[]): NoteAction => {
  return {
    type: NoteActionTypes.UPDATE_NOTE_COLOR,
    payload: {
      notes,
    },
  };
};

function reducer(state: NoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case NoteActionTypes.LOAD_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case NoteActionTypes.SELECT_NOTE:
      return {
        ...state,
        selectedId: action.payload.id,
      };
    case NoteActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case NoteActionTypes.CREATE_NOTE:
      if (state.notes) {
        return {
          ...state,
          notes: [...state.notes, action.payload.note],
          selectedId: action.payload.note.id,
        };
      }
      return state;
    case NoteActionTypes.UPDATE_NOTE:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case NoteActionTypes.UPDATE_NOTE_COLOR:
      return {
        ...state,
        notes: action.payload.notes,
      };
    default:
      return state;
  }
}

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    notes: undefined,
    selectedId: undefined,
  });

  useEffect(() => {
    const getNotes = async () => {
      // instead of calling async storage in a real case
      // you would here make a fetch request to your API
      try {
        let notes = [];
        const savedNotes = await AsyncStorage.getItem(StorageKeys.USER_NOTES);
        if (savedNotes !== null) {
          notes = JSON.parse(savedNotes);
        }
        dispatch(loadNotes(notes));
      } catch {
        Alert.alert('An error occured while getting your notes');
      }
    };
    getNotes();
  }, []);

  const onSelectNote = (id?: number) => {
    dispatch(selectNote(id));
  };

  const onDeleteNote = async (id: number) => {
    if (!state.notes) return;
    const nextNotes = state.notes.filter((note) => note.id !== id);
    // instead of calling async storage in a real case
    // you would here make a fetch request to your API
    try {
      await AsyncStorage.setItem(
        StorageKeys.USER_NOTES,
        JSON.stringify(nextNotes)
      );
      dispatch(deleteNote(nextNotes));
    } catch {
      Alert.alert('An error occured while deleting your note');
    }
  };

  const onCreateNote = async (title: string, content: string) => {
    if (!state.notes) return;
    // in real case you could use uuid generator
    const max = state.notes?.reduce(
      (prev, current) => (prev > current.id ? prev : current.id),
      0
    );
    const newNote: Note = {
      id: max + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title,
      content,
      color: 'primary',
    };
    // instead of calling async storage in a real case
    // you would here make a fetch request to your API
    try {
      await AsyncStorage.setItem(
        StorageKeys.USER_NOTES,
        JSON.stringify([...state.notes, newNote])
      );
      dispatch(createNote(newNote));
    } catch {
      Alert.alert('An error occured while deleting your note');
    }
  };

  const onUpdateNote = async (id: number, title: string, content: string) => {
    if (!state.notes) return;
    const updatedNote: Note | undefined = state.notes.find(
      (note) => note.id === id
    );
    if (updatedNote) {
      updatedNote.title = title;
      updatedNote.content = content;
      updatedNote.updatedAt = Date.now();
      const nextNotes = [
        ...state.notes.filter((note) => note.id !== id),
        updatedNote,
      ];
      // instead of calling async storage in a real case
      // you would here make a fetch request to your API
      try {
        await AsyncStorage.setItem(
          StorageKeys.USER_NOTES,
          JSON.stringify(nextNotes)
        );
        dispatch(updateNote(nextNotes));
      } catch {
        Alert.alert('An error occured while deleting your note');
      }
    }
  };

  const onUpdateNoteColor = async (id: number, color: NoteColors) => {
    if (!state.notes) return;
    const updatedNote: Note | undefined = state.notes.find(
      (note) => note.id === id
    );
    if (updatedNote) {
      updatedNote.color = color;
      updatedNote.updatedAt = Date.now();
      const nextNotes = [
        ...state.notes.filter((note) => note.id !== id),
        updatedNote,
      ];
      // instead of calling async storage in a real case
      // you would here make a fetch request to your API
      try {
        await AsyncStorage.setItem(
          StorageKeys.USER_NOTES,
          JSON.stringify(nextNotes)
        );
        dispatch(updateNoteColor(nextNotes));
      } catch {
        Alert.alert('An error occured while deleting your note');
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        selectedNote: state.notes?.find((note) => note.id === state.selectedId),
        selectNote: onSelectNote,
        deleteNote: onDeleteNote,
        createNote: onCreateNote,
        updateNote: onUpdateNote,
        updateNoteColor: onUpdateNoteColor,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
