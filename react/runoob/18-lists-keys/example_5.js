const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);