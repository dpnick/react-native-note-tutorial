import { Note } from '@models/note';
import { subDays, subMonths } from 'date-fns';
import React, { createContext, useContext, useReducer } from 'react';

const EXAMPLE_NOTES: Note[] = [
  {
    id: 1,
    title: 'First',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    color: 'secondary',
  },
  {
    id: 2,
    title: 'Second',
    createdAt: subMonths(Date.now(), 3).getTime(),
    updatedAt: subDays(Date.now(), 1).getTime(),
    content: `Lorem Ipsum is simply dummy text`,
    color: 'primary',
  },
  {
    id: 3,
    title: 'Third',
    createdAt: subDays(Date.now(), 10).getTime(),
    updatedAt: subDays(Date.now(), 5).getTime(),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    color: 'primary',
  },
  {
    id: 4,
    title: 'Fourth',
    createdAt: subDays(Date.now(), 22).getTime(),
    updatedAt: subDays(Date.now(), 20).getTime(),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum.`,
    color: 'secondary',
  },
];

interface INoteContext {
  notes: Note[];
  selectedNote?: Note;
  selectNote: (id: number) => void;
  updateNote: (id: number, content: string) => void;
}

const NoteContext = createContext<INoteContext>({
  notes: [],
  selectNote: () => {},
  updateNote: () => {},
});

export function useNote() {
  return useContext(NoteContext);
}

enum NoteActionTypes {
  SELECT_NOTE = 'select-note',
  UPDATE_NOTE = 'update-note',
}

interface NoteAction {
  type: NoteActionTypes;
  payload: any;
}

interface NoteState {
  notes: Note[];
  selectedId: number | undefined;
}

const selectNote = (id: number): NoteAction => {
  return {
    type: NoteActionTypes.SELECT_NOTE,
    payload: {
      id,
    },
  };
};

const updateNote = (id: number, content: string): NoteAction => {
  return {
    type: NoteActionTypes.UPDATE_NOTE,
    payload: {
      id,
      content,
    },
  };
};

function reducer(state: NoteState, action: NoteAction): NoteState {
  const { type, payload } = action;
  switch (type) {
    case NoteActionTypes.SELECT_NOTE:
      return {
        ...state,
        selectedId: payload.id,
      };
    case NoteActionTypes.UPDATE_NOTE:
      const updatedNote: Note | undefined = state.notes.find(
        (note) => note.id === payload.id
      );
      if (updatedNote) {
        updatedNote.content = payload.content;
        updatedNote.updatedAt = Date.now();
        return {
          ...state,
          notes: [
            ...state.notes.filter((note) => note.id !== payload.id),
            updatedNote,
          ],
        };
      }
      return state;
    default:
      return state;
  }
}
const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    notes: EXAMPLE_NOTES,
    selectedId: undefined,
  });

  const onSelectNote = (id: number) => {
    dispatch(selectNote(id));
  };

  const onUpdateNote = (id: number, content: string) => {
    dispatch(updateNote(id, content));
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        selectedNote: state.notes.find((note) => note.id === state.selectedId),
        selectNote: onSelectNote,
        updateNote: onUpdateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
