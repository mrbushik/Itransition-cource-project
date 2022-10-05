import React from 'react';

function PostItem({ id, tags, otherFields }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{tags}</td>
      {Object.values(otherFields).map((item, index) => (
        <td key={index}>{item}</td>
      ))}
    </tr>
  );
}

export default PostItem;
