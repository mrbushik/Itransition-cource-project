import React from 'react';
import PropTypes from 'prop-types';
import OtherFieldsRender from './otherFieldsRender';
import TagsRender from './tagsRender';

function PostItem({ id, tags, otherFields, fieldsType }) {
  return (
    <tr>
      <td>{id}</td>
      <TagsRender tags={tags} />
      {Object.values(otherFields).map((item, index) => (
        <OtherFieldsRender key={index} fieldValue={item} type={fieldsType[index].type} />
      ))}
    </tr>
  );
}

PostItem.propTypes = {
  id: PropTypes.string,
  fieldsType: PropTypes.arrayOf(PropTypes.object),
  otherFields: PropTypes.array,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default PostItem;
