import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import EditBtn from '../buttons/editBtn';
import CreateItemsModal from './ItemsModal/createItemsModal';
import EditItemsModal from './ItemsModal/editItemsModal';
import transtateKeys from '../../translate/transtateKeys';

function ShowModal({ btnList, collectionId, data, onUpdateData }) {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState('');

  const DEFAULT_POSTS_FIELDS_LENGTH = 2;

  const toggleActiveModal = (value) => setActiveModal(+value);
  return (
    <>
      <EditBtn onToggle={toggleActiveModal} btnList={btnList} />
      {activeModal === 0 && (
        <CreateItemsModal
          fieldsCount={data.postsTemplate.length - DEFAULT_POSTS_FIELDS_LENGTH}
          addingFields={data.postsTemplate.slice(DEFAULT_POSTS_FIELDS_LENGTH, data.length)}
          collectionId={collectionId}
          onClose={toggleActiveModal}
          onUpdateData={onUpdateData}
        />
      )}
      {activeModal === 1 && btnList[1] && (
        <EditItemsModal
          posts={data.posts}
          postsTemplates={data.postsTemplate.slice(
            DEFAULT_POSTS_FIELDS_LENGTH,
            data.postsTemplate.length,
          )}
          onClose={toggleActiveModal}
          fieldsCount={data.postsTemplate.length - DEFAULT_POSTS_FIELDS_LENGTH}
          modalType={t(transtateKeys.EDIT)}
          onUpdateData={onUpdateData}
        />
      )}
      {activeModal === 2 && btnList[2] && (
        <EditItemsModal
          posts={data.posts}
          postsTemplates={data.postsTemplate.slice(
            DEFAULT_POSTS_FIELDS_LENGTH,
            data.postsTemplate.length,
          )}
          onClose={toggleActiveModal}
          fieldsCount={data.postsTemplate.length - DEFAULT_POSTS_FIELDS_LENGTH}
          modalType={t(transtateKeys.DELETE)}
          onUpdateData={onUpdateData}
          collectionId={collectionId}
        />
      )}
    </>
  );
}

ShowModal.propTypes = {
  btnList: PropTypes.array,
  collectionId: PropTypes.string,
  data: PropTypes.object,
  onUpdateData: PropTypes.func,
};

export default ShowModal;
