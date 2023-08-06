export type DataResponse = {
  data: DeckType[];
};
export type DeckType = {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  tags: string | null;
  image: string | null;
  visibility: string | null | undefined;
  created_at: string;
  updated_at: string;
};

export type DeckTypeDTO = {
  id: number | null;
  user_id?: number | null;
  name?: string | null;
  description?: string | null;
  tags?: string | null;
  image?: string | null;
  visibility?: string | null | undefined;
  created_at: string;
  updated_at: string;
};
export type DecksListType = {
  decks: DeckType[];
};
