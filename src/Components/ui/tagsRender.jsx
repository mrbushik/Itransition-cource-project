import React from 'react';

function TagsRender({ tags }) {
  return (
    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
      {tags.map((item, index) => (
        <span key={index}> {item}</span>
      ))}
    </td>
  );
}

export default TagsRender;
