import axios from 'axios';
import type { Note, CreateNoteType} from '../types/note';

interface FetchNotesParams{
    page: number
    search: string
}

interface DeleteNoteParams{
    id: string
}

interface FetchNotesParamsHttpResponse{
    notes: Note[]
    totalPages: number;
}

const key = import.meta.env.VITE_NOTEHUB_TOKEN
const options = {
    headers: {
        Accept: "application/json",  
        Authorization: `Bearer ${key}`
    }
}

export const fetchNotes = async ({page, search}: FetchNotesParams) : Promise<FetchNotesParamsHttpResponse> => {
    const response = await axios.get<FetchNotesParamsHttpResponse>("https://notehub-public.goit.study/api/notes", {...options, params: {page: page, search: search}}  )
    return response.data
    
}

export const createNote = async ( {title, content, tag} : CreateNoteType) : Promise<Note> => {
    const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes", {title, content, tag}, options)
    return response.data
}

export const deleteNote = async ({id, } : DeleteNoteParams) : Promise<Note> => {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, options)
    return response.data
}