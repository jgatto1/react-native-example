import {
  LearnCategoriesRes,
  LearnCategory,
  LearnPostCategory,
  LearnPostReflection,
  LearnPostsReflectionsRes,
  LearnPostsRes,
} from 'model/backend/learn-post';
import React, { useContext, useEffect, useState } from 'react';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';

declare type ReflectionsByPost = { [post: number]: LearnPostReflection[] };

interface ILearnContext {
  content: LearnPostCategory[];
  reflections: ReflectionsByPost;
  addReflection: (post: number, reflection: LearnPostReflection) => void;
  loading?: boolean;
}

const Context = React.createContext<ILearnContext>({} as ILearnContext);

export const useLearn = () => useContext(Context);

const buildData = async (categories: LearnCategory[]): Promise<LearnPostCategory[]> => {
  return BackendClient.get<LearnPostsRes>('/learn_posts')
    .then(validateResponse)
    .then((res) => res.learn_posts)
    .then((posts) => {
      return categories.map((category) => ({
        category,
        posts: posts.filter((p) => p.category_id === category.id).map((p) => ({ ...p, category })),
      }));
    });
};

export const LearnProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<LearnPostCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [reflections, setReflections] = useState<ReflectionsByPost>({});

  useEffect(() => {
    BackendClient.get<LearnPostsReflectionsRes>('/learn_post/reflections')
      .then(validateResponse)
      .then((res) => {
        const reflectionsByPost = res.learn_post_reflections.reduce((acc, act) => {
          const postId = act.learn_post_id;
          return { ...acc, [postId]: [...(acc[postId] || []), act] };
        }, {} as ReflectionsByPost);
        setReflections(reflectionsByPost);
      })
      .catch((err) => {
        console.warn('Cannot fetch posts reflections', err);
      });
    BackendClient.get<LearnCategoriesRes>('/learn_categories', { params: { order_by: 'index' } })
      .then(validateResponse)
      .then((res) => buildData(res.learn_categories))
      .then((d) => setContent(d))
      .catch((err) => {
        console.warn('Cannot load learn context data', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const addReflection = (post: number, reflection: LearnPostReflection) => {
    setReflections({
      ...reflections,
      [post]: [...(reflections[post] || []), reflection],
    });
  };

  const value: ILearnContext = { content, loading, reflections, addReflection };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
