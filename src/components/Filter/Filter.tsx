import {useState, useEffect } from 'react';
import s from './Filter.module.css';

interface IFilter {
  filterContacts: (query: string) => void
}

export default function Filter({ filterContacts }: IFilter) {
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    filterContacts(filterValue);
  }, [filterValue, filterContacts]);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };
    return (
      <div>
        <label>
          Find contacts by name:
          <input
            type="text"
            name="filter"
            value={filterValue}
            onChange={handleChangeFilter}
            className={s.fieldInput}
          />
        </label>
      </div>
    );
  }

