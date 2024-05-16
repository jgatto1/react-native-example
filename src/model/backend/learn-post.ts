import { F, Res } from 'model/backend/index';

export interface LearnPost {
  category_id: number;
  id: number;
  subcategory: string;
  text: string;
}

export interface LearnPostWithCategory extends LearnPost {
  category: LearnCategory;
}

export interface LearnCategory {
  id: number;
  index: number;
  name: string;
}

export interface LearnPostCategory {
  category: LearnCategory;
  posts: LearnPostWithCategory[];
}

export interface LearnPostReflection {
  created: string;
  id: number;
  learn_post_id: number;
  modified: string;
  text: string;
  user_uuid: string;
}

export declare type LearnPostsReflectionsRes = Res<F<'learn_post_reflections', LearnPostReflection[]>>;

export declare type LearnPostsReflectionRes = Res<F<'learn_post_reflection', LearnPostReflection>>;

export declare type LearnPostsRes = Res<F<'learn_posts', LearnPost[]>>;

export declare type LearnCategoriesRes = Res<F<'learn_categories', LearnCategory[]>>;
