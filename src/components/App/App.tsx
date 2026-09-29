import { NoteForm } from "../NoteForm/NoteForm"
import css from "./App.module.css"
import { fetchNotes } from "../../services/noteService"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Pagination } from "../Pagination/Pagination"
import SearchBox  from "../SearchBox/SearchBox"
import { NoteList } from "../NoteList/NoteList"
import { Modal } from "../Modal/Modal"
const App = () => {

    const[searchValue, setSearch]=useState<string>("")
    const[page, setPage]= useState<number>(1)
    const[isForm, setForm]= useState<boolean>(false)
    const {data, isLoading, isError} = useQuery({
      queryKey: ["notes", page, searchValue ],
      queryFn: () => fetchNotes( {page, search: searchValue}),
      placeholderData: keepPreviousData
    })

    const onChange = useDebouncedCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
      },
      400
    );
    const notes = data?.notes ?? []
    console.log(data)

    const onClose = (value: boolean) => {
        setForm(value)
    }

  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
		    <SearchBox value={searchValue} onChange={onChange} />
		    {(data?.totalPages ?? 0) > 1 && <Pagination totalPages={data?.totalPages ?? 0} currentPage={page} onPageChange={setPage}/>}
		    <button className={css.button} onClick={() => onClose(!isForm)}>Create note +</button>
      </header>
       {notes && <NoteList notes={notes} />}
       {isForm && 
        <Modal onClose={() => setForm(false)}>
          <NoteForm onClose={() => setForm(false)}/>
        </Modal>}
       {isLoading && <h3>Content is loading</h3>}
       {isError && <h3>..Ops</h3>}
       
    </div>
  )
}

export default App