import type { Note } from "../../types/note"
import css from "./NoteList.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteNote } from "../../services/noteService"

interface NoteListProps{
  values: Note[]
}
export const NoteList = ({values}: NoteListProps) => {

    const queryClient =  useQueryClient();
    
        const mutationDelete = useMutation({
          mutationFn: deleteNote,
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["notes"]})

          }
        })

    return (
        <ul className={css.list}>
          {values.map(value => (
              <li key={value.id} className={css.listItem}>
              <h2 className={css.title}>{value.title}</h2>
                <p className={css.content}>{value.content}</p>
                  <div className={css.footer}>
                  <span className={css.tag}>{value.tag}</span>
                  <button onClick={() => mutationDelete.mutate({id: value.id})} className={css.button}>Delete</button>
                </div>
              </li>    
              )
            )
          }
     </ul>

    )
}