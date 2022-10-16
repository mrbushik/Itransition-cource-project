import React from 'react';
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

export default PostItem;
