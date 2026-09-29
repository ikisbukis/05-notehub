import axios from 'axios';
import type { Note, CreateNoteType} from '../types/note';

interface fetchNotesParams{
    page: number
    searchValue: string
}

interface deleteNoteParams{
    id: string
}

interface fetchNotesParamsHttpResponse{
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

export const fetchNotes = async ({page, searchValue}: fetchNotesParams) : Promise<fetchNotesParamsHttpResponse> => {
    const response = await axios.get("https://notehub-public.goit.study/api/notes", {...options, params: {page: page, search: searchValue}}  )
    return response.data
    
}

export const createNote = async ( {title, content, tag} : CreateNoteType) : Promise<Note> => {
    const response = await axios.post("https://notehub-public.goit.study/api/notes", {title, content, tag}, options)
    return response.data
}

export const deleteNote = async ({id} : deleteNoteParams) : Promise<Note> => {
    const response = await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, options)
    return response.data
}