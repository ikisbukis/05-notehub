import axios from 'axios';
import type { Note, CreateNoteType} from '../types/note';

interface fetchNotesParams{
    page: number
    search: string
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

export const fetchNotes = async ({page, search}: fetchNotesParams) : Promise<fetchNotesParamsHttpResponse> => {
    const response = await axios.get("https://notehub-public.goit.study/api/notes", {...options, params: {page: page, search: search}}  )
    return response.data
    
}

export const createNote = async ( {title, content, tag} : CreateNoteType) => {
    const response = await axios.post("https://notehub-public.goit.study/api/notes", {title, content, tag}, options)
    return response.data
}

export const deleteNote = async ({id} : deleteNoteParams) => {
    const response = await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, options)
    return response.data
}