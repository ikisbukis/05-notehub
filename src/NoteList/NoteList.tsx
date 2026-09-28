import type { Note } from "../types/note"
import css from "./NoteList.module.css"

interface NoteListProps{
  values: Note[]
  onDelete: (id: string) => void
}
export const NoteList = ({values, onDelete}: NoteListProps) => {
    
    return (
        <ul className={css.list}>
          {values.map(value => (
              <li key={value.id} className={css.listItem}>
              <h2 className={css.title}>{value.title}</h2>
                <p className={css.content}>{value.content}</p>
                  <div className={css.footer}>
                  <span className={css.tag}>{value.tag}</span>
                  <button onClick={() => onDelete(value.id)} className={css.button}>Delete</button>
                </div>
              </li>    
              )
            )
          }
     </ul>

    )
}