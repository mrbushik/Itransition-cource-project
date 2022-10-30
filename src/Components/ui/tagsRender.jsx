import React from 'react';

function TagsRender({ tags }) {
  return (
    <td className="post-tags">
      {tags.map((item, index) => (
        <span key={index}> {item}</span>
      ))}
    </td>
  );
}

export default TagsRender;
