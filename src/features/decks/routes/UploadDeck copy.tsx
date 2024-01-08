import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DeleteIcon,
  FileIcon,
  LucideCheckCircle,
  LucideXOctagon,
  PlusCircleIcon,
} from 'lucide-react';
import { useState } from 'react';
import { DeckType } from '../types';
import { Button } from '@/components/ui/button';
import { deckApi } from '../api';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { USER_ID } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { handleKeyDown } from '@/lib/inputKeyUpMod';
import { FileDrop } from '@/components/ui/file-drop';
import {
  assignDeckJSONToUser,
  sanitizeDeckJSON,
} from '../utils/sanitizeDeckJSON';
import { Input } from '@/components/ui/input';
import { appendRecentFile, getRecentFiles } from '../utils/decksLocalStorage';

export const UploadDeckCopy = () => {
  const [json, setJson] = useState<DeckType[] | Partial<DeckType>[]>([]);
  const [recentFiles, setRecentFiles] = useState(getRecentFiles());
  const [input, setInput] = useState('' as string);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
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

      // remove invalid properties from json
      const { isValid, message, data } = sanitizeDeckJSON(json);
      if (!isValid) {
        alert(message);
        return;
      }
      // assign current user id to each deck uploaded
      const assignedData = assignDeckJSONToUser(USER_ID, data);
      setJson(assignedData);
      setInput(JSON.stringify(assignedData, null, 2));
      setError(null);
      // save to local storage
      const key = file.name;
      appendRecentFile({ fileName: key, data: assignedData });
      setRecentFiles(getRecentFiles());
    };
  };

  const handleSubmit = async () => {
    if (json.length === 0) {
      return;
    }
    const { data, error } = await deckApi.createDecks(json);
    console.log(data);
    setJson([]);
    setInput('');
    setError(null);

    if (error) {
      return toast({
        title: 'Done!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-error' />,
      });
    }

    toast({
      title: 'Done!',
      description: `You have successfully created decks`,
      icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
    });
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setJson([]);
      setError(null);
      setInput('');
      return;
    }
    const text = e.target.value;
    setInput(text);
    try {
      let json = JSON.parse(text);
      // if json is not an array, make it an array
      if (!Array.isArray(json)) {
        json = [json];
      }

      const { isValid, message, data } = sanitizeDeckJSON(json);
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

  function handleTableEdit(
    event: React.ChangeEvent<HTMLInputElement>,
    prop: keyof DeckType,
    index: number
  ) {
    event.preventDefault();
    const { value } = event.target;
    console.log(prop, value);

    const updatedJson = json.map((deck, i) => {
      if (i === index) {
        return { ...deck, [prop]: value };
      }
      return deck;
    });

    setJson(updatedJson);
    setInput(JSON.stringify(updatedJson, null, 2));
  }

  function handleDeleteDeck(index: number) {
    const updatedJson = json.filter((_, i) => i !== index);
    setJson(updatedJson);
    setInput(JSON.stringify(updatedJson, null, 2));
  }

  return (
    <div>
      <h3>Recent Files</h3>
      <section className='flex overflow-x-scroll w-full gap-4'>
        {recentFiles &&
          recentFiles.map((file, i) => (
            <div
              key={i}
              className='w-[300px] bg-card/40 [&>*]:text-foreground/30 hover:bg-card hover:[&>*]:text-foreground rounded-lg border-l-2 hover:border-primary [&>*]:transition-colors [&>*]:duration-300 [&>*]:ease-in-out transition-colors duration-300 ease-in-out cursor-pointer'
            >
              <div className='flex items-center  h-full p-2'>
                <div className='w-12 h-12'>
                  <FileIcon className='w-full h-full' />
                </div>
                <p className='text-sm font-medium'>{file.fileName}</p>
                <Button
                  variant='secondary'
                  size='icon'
                  className='ml-auto'
                  onClick={() => {
                    setJson(file.data);
                    setInput(JSON.stringify(file.data, null, 2));
                  }}
                >
                  <PlusCircleIcon className='w-4 h-4' />
                </Button>
              </div>
            </div>
          ))}
      </section>
      <section className='flex flex-col items-center justify-center min-h-[calc(100vh-50rem)] p-6'>
        <h2 className='font-bold leading-10 text-3xl mb-8'>
          Upload or Type Deck
        </h2>
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
                    Upload Deck JSON
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center space-y-4 '>
                  <div className='w-full relative'>
                    <FileDrop accept='.json' onChange={handleUpload} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='input'>
              <div className='w-full relative'>
                <Textarea
                  className='
                w-full
                font-mono
                text-sm
                bg-background
                font-medium
                whitespace-nowrap
                overflow-auto
                rounded-xl
                text-green-400
              '
                  onChange={handleTextInput}
                  onKeyDown={handleKeyDown}
                  rows={20}
                  placeholder='Paste your JSON here'
                  id='jsonInput'
                  value={input}
                ></Textarea>
                {input && (
                  <Button
                    variant='secondary'
                    size='icon'
                    onClick={() => {
                      setJson([]);
                      setError(null);
                      setInput('');
                    }}
                    className='absolute -top-5 -right-5 rounded-full animate-fade-in backdrop-blur-sm'
                  >
                    <DeleteIcon className='w-4 h-4' />
                  </Button>
                )}
                <div className='flex justify-between mt-4'>
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
            <div className='flex justify-between'>
              <Button
                variant='destructive'
                onClick={() => {
                  setJson([]);
                  setError(null);
                  navigate(-1);
                }}
                className='flex mt-4'
              >
                Cancel
              </Button>
              {json.length > 0 && !error && (
                <Button onClick={handleSubmit} className='flex ml-auto mt-4'>
                  Submit
                </Button>
              )}
            </div>
          </Tabs>
          {json.length > 0 && (
            <Card className='mt-8 rounded-lg shadow-lg'>
              <CardHeader className='border-b p-4 bg-card'>
                <CardTitle className='text-lg md:text-xl font-semibold flex justify-between items-center'>
                  <span className='flex flex-col'>
                    <span className='font-medium'>Decks</span>
                    <span className='text-foreground/50 font-normal text-sm'>
                      List of Decks in the attached JSON file
                    </span>
                  </span>
                  <div className='flex items-center gap-2'>
                    <FileIcon className='w-6 h-6' />
                    <span className='font-medium'>Number of Items:</span>
                    <Badge className='ml-2'>{json.length}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <div className='p-4 pt-0 block h-[500px] overflow-auto'>
                <table className='relative border-collapse '>
                  <TableHeader className=''>
                    <TableRow className='font-medium text-foreground/50'>
                      <TableHead className='sticky top-0 bg-card'>#</TableHead>
                      <TableHead className='sticky top-0 bg-card'>
                        Name
                      </TableHead>
                      <TableHead className='sticky top-0 bg-card'>
                        Description
                      </TableHead>
                      <TableHead className='sticky top-0 bg-card'>
                        Image(Emoji)
                      </TableHead>
                      <TableHead className='sticky top-0 bg-card'>
                        Tags
                      </TableHead>
                      <TableHead className='sticky top-0 bg-card'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody id='tableDecks'>
                    {json.map((deck, i) => (
                      <TableRow key={i} className='deckRow'>
                        <TableCell>
                          <span className='font-medium'>{i + 1}</span>
                        </TableCell>
                        <TableCell>
                          <Input
                            autoFocus
                            name='name'
                            type='text'
                            value={deck.name}
                            onChange={(e) => handleTableEdit(e, 'name', i)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type='text'
                            value={deck.description || ''}
                            onChange={(e) =>
                              handleTableEdit(e, 'description', i)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type='text'
                            value={deck.image || ''}
                            onChange={(e) => handleTableEdit(e, 'image', i)}
                            maxLength={1}
                            className='w-[6ch]'
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type='text'
                            value={deck.tags || ''}
                            onChange={(e) => handleTableEdit(e, 'tags', i)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant='secondary'
                            size='icon'
                            onClick={() => handleDeleteDeck(i)}
                          >
                            <DeleteIcon className='w-4 h-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Button
                          variant='secondary'
                          size='icon'
                          onClick={() => {
                            const newDeck = {
                              name: '',
                              description: '',
                              image: '',
                              tags: '',
                              visibility: 'public',
                              user_id: USER_ID,
                            };
                            setJson([...json, newDeck]);
                          }}
                        >
                          <PlusCircleIcon className='w-4 h-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};
