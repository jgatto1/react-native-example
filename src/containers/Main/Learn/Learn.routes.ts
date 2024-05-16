import { LearnPostWithCategory } from 'model/backend/learn-post';

export enum LearnRoutes {
  MAIN = 'Learn-Main',
}

const routeForPostId = (post: number) => {
  return `Learn-Post-${post}`;
};

export const routeFor = (post: LearnPostWithCategory) => {
  return routeForPostId(post.id);
};

export enum LearnPostId {
  URGENT_RESOURCES = 63,
}

export const LearnRoutesStatic = {
  URGENT_RESOURCES: routeForPostId(LearnPostId.URGENT_RESOURCES),
};
