import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditButtons from '../buttons/editButtons';
import CreateItemsModal from './ItemsModal/createItemsModal';
import EditItemsModal from './ItemsModal/editItemsModal';

function ShowModal({ btnList, collectionId, data }) {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState('');

  const toggleActiveModal = (value) => setActiveModal(value);

  return (
    <>
      <EditButtons onToggle={toggleActiveModal} btnList={btnList} />
      {(activeModal === 'Create' || activeModal === 'Создать') && (
        <CreateItemsModal
          fieldsCount={data.postsTemplate.length - 2}
          addingFields={data.postsTemplate.slice(2, data.length)}
          collectionId={collectionId}
          onClose={toggleActiveModal}
        />
      )}
      {(activeModal === 'Edit' || activeModal === 'Редактировать') && (
        <EditItemsModal
          posts={data.posts}
          postsTemplates={data.postsTemplate.slice(1, data.postsTemplate.length)}
          onClose={toggleActiveModal}
          fieldsCount={data.postsTemplate.length - 1}
          modalType={t('edit')}
        />
      )}
      {(activeModal === 'Delete' || activeModal === 'Удалить') && (
        <EditItemsModal
          posts={data.posts}
          postsTemplates={data.postsTemplate.slice(1, data.postsTemplate.length)}
          onClose={toggleActiveModal}
          fieldsCount={data.postsTemplate.length - 1}
          modalType={t('delete')}
        />
      )}
    </>
  );
}

export default ShowModal;