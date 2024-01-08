import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DeleteIcon,
  FileIcon,
  LucideCheckCircle,
  LucideXOctagon,
} from 'lucide-react';
import { useState } from 'react';
import { FlashcardType } from '../types';
import { Button } from '@/components/ui/button';
import { flashcardApi } from '../api';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { USER_ID } from '@/constants';
import { useToast } from '@/components/ui/use-toast';

export const UploadFlashcards = () => {
  const [json, setJson] = useState<FlashcardType[] | Partial<FlashcardType>[]>(
    []
  );
  const [input, setInput] = useState('' as string);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;
  const { toast } = useToast();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    console.log(file);
    e.target.classList.add('tw-file-input--dropped');
    e.target.setAttribute('data-file-name', file.name);
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (e) => {
      let json = JSON.parse(e.target?.result as string);
      // if json is not an array, make it an array
      if (!Array.isArray(json)) {
        json = [json];
      }

      const { isValid, message, data } = sanitizeFlashcardJSON(json);
      if (!isValid) {
        alert(message);
        return;
      }
      setJson(data);
    };
  };

  const handleSubmit = async () => {
    if (json.length === 0) {
      return;
    }
    const { data, error } = await flashcardApi.createFlashcards(json);
    console.log(data);
    setJson([]);
    setInput('');
    setError(null);
    if (error) {
      toast({
        title: 'Done!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-error' />,
      });
      return;
    }

    toast({
      title: 'Done!',
      description: `You have successfully created flashcards`,
      icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
    });
  };

  function sanitizeFlashcardJSON(json: FlashcardType[]) {
    // require name for each element, make sure all values are strings, return sanitized json and error message if any
    try {
      const sanitizedData = json.map((flashcard) => {
        const { question, answer, hint, tags } = flashcard;
        if (!question || !answer)
          throw new Error('Flashcard question and answer are required');
        // make sure all values are strings and only include valid keys

        const sanitizedFlashcard = {
          deck_id: Number(id),
          user_id: USER_ID,
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

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    try {
      let json = JSON.parse(text);
      // if json is not an array, make it an array
      if (!Array.isArray(json)) {
        json = [json];
      }

      const { isValid, message, data } = sanitizeFlashcardJSON(json);
      console.log(isValid, message, data);
      if (!isValid) {
        setError(message);
        return;
      }
      setJson(data);
      setError(null);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-50rem)] p-6'>
      {state && (
        <Link to={`/decks/${state.deck.id}/flashcards`}>{state.deck.name}</Link>
      )}
      <div className='w-full max-w-[120ch] mx-auto flex flex-col'>
        <Tabs defaultValue='file'>
          <TabsList>
            <TabsTrigger value='file'>Upload</TabsTrigger>
            <TabsTrigger value='input'>Input</TabsTrigger>
          </TabsList>
          <TabsContent value='file'>
            <Card>
              <CardHeader>
                <CardTitle className='text-center'>
                  Upload Flashcard JSON
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col items-center space-y-4'>
                <div className='w-full '>
                  <Input
                    className='tw-file-input'
                    id='fileUpload'
                    type='file'
                    accept='.json'
                    data-drop-zone='true'
                    onChange={handleUpload}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.add('tw-file-input--drag');
                      e.currentTarget.classList.remove(
                        'tw-file-input--dropped'
                      );
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('tw-file-input--drag');
                      e.currentTarget.classList.remove(
                        'tw-file-input--dropped'
                      );
                    }}
                    onDrop={(e) => {
                      console.log('drop');
                      e.currentTarget.classList.remove('tw-file-input--drag');
                      e.currentTarget.classList.add('tw-file-input--dropped');
                      const file = e.dataTransfer?.files?.[0];
                      if (!file) {
                        return;
                      }
                      console.log(file);
                      // set data-file-name attr to file name
                      e.currentTarget.setAttribute('data-file-name', file.name);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='input'>
            <div className='w-full'>
              <Textarea
                className='
                w-full
                font-mono
                text-sm
                bg-white
                font-medium
                whitespace-nowrap
                overflow-auto
                rounded-xl
                text-success
              '
                onChange={handleTextInput}
                rows={20}
                placeholder='Paste your JSON here'
                id='jsonInput'
                value={input}
              ></Textarea>
              <div className='flex justify-between mt-4'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    setJson([]);
                    setError(null);
                  }}
                >
                  <DeleteIcon className='w-6 h-6' />
                </Button>
                {error && (
                  <div className=''>
                    <p className='text-sm font-medium text-destructive'>
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          {json.length > 0 && (
            <Button onClick={handleSubmit} className='flex ml-auto mt-4'>
              Submit
            </Button>
          )}
        </Tabs>
        {json.length > 0 && (
          <Card className='mt-8 rounded-lg shadow-lg '>
            <CardHeader className='border-b p-4 bg-card'>
              <CardTitle className='text-lg md:text-xl font-semibold flex justify-between items-center'>
                <span>JSON Content</span>
                <div className='flex items-center gap-2'>
                  <FileIcon className='w-6 h-6' />
                  <span className='font-medium'>Number of Items:</span>
                  <Badge className='ml-2'>{json.length}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <div className='p-4 md:p-6 h-[500px] overflow-auto'>
              <Table className='sticky top-0'>
                <TableHeader>
                  <TableRow className='font-medium text-foreground/50'>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Hint</TableCell>
                    <TableCell>Tags</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {json.map((flashcard) => (
                    <TableRow key={flashcard.question}>
                      <TableCell>{flashcard.question}</TableCell>
                      <TableCell>{flashcard.answer}</TableCell>
                      <TableCell>{flashcard.hint}</TableCell>
                      <TableCell>{flashcard.tags}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
