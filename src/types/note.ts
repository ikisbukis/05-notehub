
export interface NoteTag{
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | string
}

export interface Note{
    id: string,
    title: string,
    content: string,
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" 
}

export interface CreateNoteType {
  title: string;
  content: string;
  tag: NoteTag | string;
}