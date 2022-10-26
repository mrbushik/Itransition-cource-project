import React from 'react';
import PropTypes from 'prop-types';

import PostItem from '../ui/postItem';
import { useTranslation } from 'react-i18next';
import transtateKeys from '../translate/transtateKeys';
function PostsRender({ data }) {
  const { t } = useTranslation();
  const postsTemplate = Object.values(data.postsTemplate);
  const postsTypeInfo = Object.values(data.postsTemplate);

  const DEFAULT_TYPE_ITEM_LENGTH = 1;
  const DEFAULT_POST_ITEM_LENGTH = 2;

  postsTypeInfo.splice(0, DEFAULT_TYPE_ITEM_LENGTH);
  postsTemplate.splice(0, DEFAULT_POST_ITEM_LENGTH);

  return (
    <>
      {data && (
        <>
          <h2 className="text-center mt-3">{data.name}</h2>
          <div className="overflow-auto">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">{t('id')}</th>
                  <th scope="col">{t(transtateKeys.TAGS)}</th>
                  <th scope="col">{t('post name')}</th>
                  {postsTemplate?.map((item, index) => (
                    <th key={index}>{item.description}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.posts?.map((itemPosts, index) => (
                  <PostItem
                    key={index}
                    id={itemPosts._id}
                    tags={itemPosts.tags}
                    otherFields={itemPosts.fields}
                    fieldsType={postsTypeInfo}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

PostsRender.propTypes = {
  data: PropTypes.object,
};

export default PostsRender;
