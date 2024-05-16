export interface Animation {
  is_deleted: boolean;
  name: string;
  topic_id: number;
  uuid: string;
}

export interface Animations {
  animations: Animation[];
}
