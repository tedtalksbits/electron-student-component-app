import { DeckType } from '../types';

export function sanitizeDeckJSON(json: DeckType[] | Partial<DeckType>[]) {
  // require name for each element, make sure all values are strings, return sanitized json and error message if any
  try {
    const sanitizedData = json.map((deck) => {
      const { name, description, image, tags, visibility } = deck;
      if (!name) throw new Error('Deck name is required');
      // make sure all values are strings and only include valid keys

      const sanitizedDeck = {
        name: String(name),
        description: description ? String(description) : null,
        image: image ? String(image) : null,
        tags: tags ? String(tags) : null,
        visibility: visibility ? String(visibility) : 'public',
      };
      return sanitizedDeck as Partial<DeckType>;
    });
    return {
      isValid: true,
      data: sanitizedData,
      message: 'Valid JSON file',
    };
  } catch (error) {
    const err = error as Error;
    return {
      isValid: false,
      data: [],
      message: err.message,
    };
  }
}

export function assignDeckJSONToUser(
  user_id: string | number,
  json: Partial<DeckType>[]
) {
  // assign userId to each deck
  const assignedData = json.map((deck) => {
    const assignedDeck = {
      ...deck,
      userId: user_id,
    };
    return assignedDeck;
  });
  return assignedData;
}
