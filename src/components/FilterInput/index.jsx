import { memo, useCallback } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import styles from './filterInput.module.css';

const FilterInput = ({ filterText, setFilterText }) => {
  const handleClear = useCallback(() => setFilterText(''));

  return (
    <div className={styles.SearchBox}>
      <input
        type='text'
        id='searchBoxInput'
        onChange={e => setFilterText(e.target.value)}
        value={filterText}
        className={styles.FilterInput}
        placeholder=' '
      />
      <label htmlFor='searchBoxInput' className={styles.LabelSearchBox}>
        Ingresa un termino a filtrar:
      </label>
      <button className={styles.InputIcon} onClick={handleClear}>
        {filterText.length > 0 ? <MdClear size={20} /> : <BsSearch size={20} />}
      </button>
    </div>
  );
};

export default memo(FilterInput);