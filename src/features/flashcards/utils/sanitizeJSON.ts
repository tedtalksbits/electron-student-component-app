import { FlashcardType } from '../types';

export function sanitizeFlashcardJSON(
  json: FlashcardType[] | Partial<FlashcardType>[]
) {
  // require name for each element, make sure all values are strings, return sanitized json and error message if any
  try {
    const sanitizedData = json.map((flashcard) => {
      const { question, answer, hint, tags } = flashcard;
      if (!question || !answer)
        throw new Error('Flashcard question and answer are required');
      // make sure all values are strings and only include valid keys

      const sanitizedFlashcard = {
        question: String(question),
        answer: String(answer),
        hint: hint ? String(hint) : null,
        tags: tags ? String(tags) : null,
      };
      return sanitizedFlashcard as Partial<FlashcardType>;
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
