import { BsSearch } from "react-icons/bs";
import { filterStateVar } from "../../state/filterState";
import { debounce } from "../../service/debounce";
import styles from "./searchInputEl.module.css";
import { useMemo, useState } from "react";

export function SearchInputEl() {
  const updateDebounceText = useMemo(() => debounce((text: string) => {
    filterStateVar({
      ...filterStateVar(),
      nameSearch: text,
    });
  }, 400), []);

  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const handleSearchElChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebounceText(e.target.value);
    setSearchInputValue(e.target.value);
  };

  return (
    <div className={styles.searchDiv}>
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        value={searchInputValue}
        onChange={handleSearchElChange}
      ></input>
      <div>
        <BsSearch className={styles.searchIcon} />
      </div>
    </div>
  );
}
