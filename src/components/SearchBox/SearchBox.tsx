import css from "./SearchBox.module.css"

interface SearchBoxProps{
    search: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBox = ({search, handleChange}: SearchBoxProps) => {
    return (
         <input 
        className={css.input} 
        id="text"type="text"
        placeholder="Search notes"
        defaultValue={search}
        onChange={handleChange} 
        />
    )
}
