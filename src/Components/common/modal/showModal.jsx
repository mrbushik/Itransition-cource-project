import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditButtons from '../buttons/editButtons';
import CreateItemsModal from './ItemsModal/createItemsModal';
import EditItemsModal from './ItemsModal/editItemsModal';

function ShowModal({ btnList, collectionId, data, onUpdateData }) {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState('');

  const toggleActiveModal = (value) => setActiveModal(+value);
  return (
    <>
      <EditButtons onToggle={toggleActiveModal} btnList={btnList} />
      {activeModal === 0 && (
        <CreateItemsModal
          fieldsCount={data.postsTemplate.length - 2}
          addingFields={data.postsTemplate.slice(2, data.length)}
          collectionId={collectionId}
          onClose={toggleActiveModal}
          onUpdateData={onUpdateData}
        />
      )}
      {activeModal === 1 && btnList[1] && (
        <EditItemsModal
          posts={data.posts}
          postsTemplates={data.postsTemplate.slice(1, data.postsTemplate.length)}
          onClose={toggleActiveModal}
          fieldsCount={data.postsTemplate.length - 1}
          modalType={t('edit')}
          onUpdateData={onUpdateData}
        />
      )}
      {activeModal === 2 && btnList[2] && (
        <EditItemsModal
          posts={data.posts}
          postsTemplates={data.postsTemplate.slice(1, data.postsTemplate.length)}
          onClose={toggleActiveModal}
          fieldsCount={data.postsTemplate.length - 1}
          modalType={t('delete')}
          onUpdateData={onUpdateData}
          collectionId={collectionId}
        />
      )}
    </>
  );
}

export default ShowModal;
