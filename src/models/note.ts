export interface Note {
  // unique identifier
  id: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  // Card background color
  color: NoteColors;
}

export type NoteColors = 'primary' | 'secondary';
