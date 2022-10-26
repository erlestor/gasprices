import { BsSearch } from "react-icons/bs";
import { filterStateVar } from "../../state/filterState";
import { debounce } from "./debounce";
import styles from "./searchInputEl.module.css";

export function SearchInputEl() {

  const updateDebounceText = debounce((text: string) => {
    filterStateVar({
        ...filterStateVar(),
        nameSearch: text,
    })
  }, 300);

  const handleSearchElChange = (e: any) => {
    updateDebounceText(e.target.value);
  };

  return (
    <div className={styles.searchDiv}>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchElChange}
      ></input>
      <div>
        <BsSearch className={styles.searchIcon} />
      </div>
    </div>
  );
}
