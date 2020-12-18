import React, { useCallback, useState } from 'react';
import { IClient } from '../../interfaces/IClient';
import Delete from '../delete';
import Card from '../card';

import {
  StyledList,
} from './styles';

interface ListProps {
  clients: IClient[];
}

const List: React.FC<ListProps> = ({ clients }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idModalDelete, setIdModalDelete] = useState(0);

  const handleCloseModalDelete = useCallback(() => setOpenModalDelete((m) => !m), []);

  const handleDeleteClick = useCallback((id: number) => {
    setIdModalDelete(id);
    setOpenModalDelete(true);
  }, []);

  return (
    <>
      <StyledList>
        {clients.map((c) => (
          <Card key={c.cpf} clickDelete={handleDeleteClick} {...c} />
        ))}

        {openModalDelete && (
          <Delete
            open={openModalDelete}
            id={idModalDelete}
            onClose={handleCloseModalDelete}
          />
        )}
      </StyledList>
    </>
  );
};

export default List;
