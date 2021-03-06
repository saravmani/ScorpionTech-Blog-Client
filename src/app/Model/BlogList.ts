export interface BlogList {
  listOfBlogPosts?: Array<BlogDetails>;
}


export interface BlogDetails {
  postId: string;
  postTitle: string;
  postDescription: string;
  postedBy: string;
  Tags: string;
  postedOn: Date;
}

