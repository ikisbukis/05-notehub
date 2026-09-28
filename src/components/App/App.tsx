import { NoteForm } from "../NoteForm/NoteForm"
import css from "./App.module.css"
import { createNote, fetchNotes, deleteNote } from "../../services/noteService"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Pagination } from "../Pagination/Pagination"
import { SearchBox } from "../SearchBox/SearchBox"
import { NoteList } from "../NoteList/NoteList"
const App = () => {

    const[search, setSearch]=useState<string>("")
    const[page, setPage]= useState<number>(1)
    const[isForm, setForm]= useState<boolean>(false)
    // const[postParams, setPostParams]= useState<CreateNoteType>({ title:"", content: "", tag: "Todo"})
    const {data, isLoading, isError} = useQuery({
      queryKey: ["notes", page, search ],
      queryFn: () => fetchNotes( {page, search}),
      placeholderData: keepPreviousData
    })

    const queryClient =  useQueryClient();

    const mutationCreate = useMutation({
      mutationFn: createNote,
      onError: () => console.log("error"),
      onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:["notes"]
          })
          setForm(false)
      }
      
    })

    const mutationDelete = useMutation({
      mutationFn: deleteNote,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["notes"]})
      }
    })
 
    const handleChange = useDebouncedCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
      400
    );
    const values = data?.notes ?? null
    console.log(data)

    const handleOnForm = (value: boolean) => {
        setForm(value)
    }

  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
		    <SearchBox search={search} handleChange={handleChange} />
		    <Pagination totalPages={data?.totalPages ?? 0} currentPage={page} onPageChange={setPage}/>
		    <button className={css.button} onClick={() => handleOnForm(!isForm)}>Create note +</button>
      </header>
       {values && <NoteList values={values} onDelete={(id) => mutationDelete.mutate({id})} />}
       {isForm && <NoteForm handleOnForm={handleOnForm} onSubmit={(values) => mutationCreate.mutate(values)} />}
       {isLoading && <h3>Content is loading</h3>}
       {isError && <h3>Ошибкеа пиздец</h3>}
    </div>
  )
}

export default App