import React from 'react';

import PostItem from '../ui/postItem';
function PostsRender({ data }) {
  const postsTemplate = Object.values(data.postsTemplate);
  postsTemplate.splice(0, 2);
  console.log(postsTemplate);
  return (
    <>
      {data && (
        <>
          <h2 className="text-center mt-3">{data.name}</h2>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">tags</th>
                <th scope="col">name</th>
                {!postsTemplate &&
                  postsTemplate.map((item, index) => <th key={index}>{item.description}1</th>)}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.posts.map((itemPosts, index) => (
                  <PostItem
                    key={index}
                    id={itemPosts._id}
                    tags={itemPosts.tags}
                    otherFields={itemPosts.fields}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default PostsRender;
