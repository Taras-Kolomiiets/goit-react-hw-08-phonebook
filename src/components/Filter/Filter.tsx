import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

interface IFilter {
  filterContacts: (query: string) => void;
}

export default function Filter({ filterContacts }: IFilter) {
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    filterContacts(filterValue);
  }, [filterValue, filterContacts]);
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };
  return (
    <div>
      <TextField
        type="text"
        name="filter"
        label="Find contacts by name:"
        onChange={handleChangeFilter}
      />
    </div>
  );
}
