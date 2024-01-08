import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteIcon, FileIcon, PlusCircleIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { handleKeyDown } from '@/lib/inputKeyUpMod';
import { FileDrop } from '@/components/ui/file-drop';
import { Input } from '@/components/ui/input';

type UploadJSONProps<T> = {
  onUpload?: OnUploadFn<T>;
  onSubmit: OnSubmitFn<T>;
  onValidate: OnValidateFn<T>;
};

export interface OnUploadFn<T> {
  (data: T[] | Partial<T>[]): void;
}
export interface OnSubmitFn<T> {
  (data: T[] | Partial<T>[]): void;
}

export interface OnValidateFn<T> {
  (data: T[] | Partial<T>[]): {
    isValid: boolean;
    validatedData: Partial<T>[];
    message: string;
  };
}

export const UploadJSON = <T extends Record<string, unknown>>({
  onUpload,
  onSubmit,
  onValidate,
}: UploadJSONProps<T>) => {
  const [json, setJson] = useState<T[] | Partial<T>[]>([]);
  const [input, setInput] = useState('' as string);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      let parsedJSON = JSON.parse(e.target?.result as string);
      // if json is not an array, make it an array
      if (!Array.isArray(parsedJSON)) {
        parsedJSON = [parsedJSON];
      }
      const { isValid, message, validatedData } = onValidate(parsedJSON);
      if (!isValid) {
        setError('File upload error: ' + message);
        setJson([]);
        setInput('');
        return;
      }
      setJson(validatedData);
      setInput(JSON.stringify(validatedData, null, 2));
      setError(null);
      onUpload && onUpload(validatedData);
    };
  };

  const handleSubmit = async () => {
    if (json.length === 0) {
      return;
    }
    onSubmit(json);
    setJson([]);
    setInput('');
    setError(null);
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
      let parsedJSON = JSON.parse(text);
      // if json is not an array, make it an array
      if (!Array.isArray(parsedJSON)) {
        parsedJSON = [parsedJSON];
      }

      const { isValid, message } = onValidate(parsedJSON);
      if (!isValid) {
        setError(message);
        return;
      }
      // setJson(validatedData);
      setError(null);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  };

  function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    try {
      let parsedJSON = JSON.parse(text);
      // if json is not an array, make it an array
      if (!Array.isArray(parsedJSON)) {
        parsedJSON = [parsedJSON];
      }

      const { isValid, message, validatedData } = onValidate(parsedJSON);
      if (!isValid) {
        setError(message);
        return;
      }
      setJson(validatedData);
      setInput(JSON.stringify(validatedData, null, 2));
      setError(null);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  }

  function handleTableEdit(
    event: React.ChangeEvent<HTMLInputElement>,
    prop: keyof T,
    index: number
  ) {
    event.preventDefault();
    const { value } = event.target;

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

  function handleAddRow() {
    const keys = Object.keys(json[0]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newObj = {} as any;
    keys.forEach((key) => {
      newObj[key] = '';
    });

    setJson([...json, newObj]);
  }

  return (
    <div>
      <section className='flex flex-col items-center justify-center min-h-[calc(100vh-50rem)] p-6'>
        <h2 className='font-bold leading-10 text-3xl mb-8'>Upload or Type</h2>
        <div className='w-full max-w-[120ch] mx-auto flex flex-col'>
          <Tabs defaultValue='file'>
            <TabsList>
              <TabsTrigger value='file'>Upload</TabsTrigger>
              <TabsTrigger value='input'>Input</TabsTrigger>
            </TabsList>
            <TabsContent value='file'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-center'>Upload JSON</CardTitle>
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
                  className='w-full font-mono text-sm bg-background font-medium whitespace-nowrap overflow-auto rounded-xl focus-within:text-green-400 focus-within:bg-transparent'
                  ref={textareaRef}
                  onChange={handleTextInput}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
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
              </div>
            </TabsContent>
            <div className='flex justify-between mt-4'>
              {error && (
                <div className=''>
                  <p className='text-sm font-medium text-destructive'>
                    {error}
                  </p>
                </div>
              )}
            </div>
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
                    <span className='font-medium'>Data</span>
                    <span className='text-foreground/50 font-normal text-sm'>
                      List of elements in the attached JSON file
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
                      {Object.keys(json[0]).map((prop, i) => (
                        <TableHead
                          key={i}
                          className='sticky top-0 bg-card uppercase'
                        >
                          {prop}
                        </TableHead>
                      ))}
                      <TableHead className='sticky top-0 bg-card'></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody id='tableDecks'>
                    {json.map((element, i) => (
                      <TableRow key={i} className='elementRow'>
                        <TableCell>
                          <span className='font-medium'>{i + 1}</span>
                        </TableCell>
                        {Object.keys(element).map((prop, j) => (
                          <TableCell key={j}>
                            <Input
                              type='text'
                              name={prop}
                              id={prop}
                              value={element[prop] as string}
                              onChange={(e) =>
                                handleTableEdit(e, prop as keyof T, i)
                              }
                            />
                          </TableCell>
                        ))}
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
                          onClick={handleAddRow}
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
