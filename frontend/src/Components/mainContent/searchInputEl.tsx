import { BsSearch } from "react-icons/bs"
import { filterStateVar } from "../../state/filterState"
import { debounce } from "../../service/debounce"
import styles from "./searchInputEl.module.css"

export function SearchInputEl() {
  const updateDebounceText = debounce((text: string) => {
    filterStateVar({
      ...filterStateVar(),
      nameSearch: text,
    })
  }, 200)

  const handleSearchElChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebounceText(e.target.value)
  }

  return (
    <div className={styles.searchDiv}>
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        onChange={handleSearchElChange}
        data-testid="searchBar"
      ></input>
      <div>
        <BsSearch className={styles.searchIcon} />
      </div>
    </div>
  )
}
