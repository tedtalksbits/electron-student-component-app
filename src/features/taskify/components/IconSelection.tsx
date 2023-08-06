import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const IconSelection = ({
  defaultValue,
}: {
  defaultValue?: string | undefined;
}) => {
  return (
    <>
      <Label htmlFor='icon'>Icon</Label>
      <Select name='icon' required defaultValue={defaultValue}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue defaultValue={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='💀'>💀</SelectItem>
            <SelectItem value='👻'>👻</SelectItem>
            <SelectItem value='👽'>👽</SelectItem>
            <SelectItem value='🤖'>🤖</SelectItem>
            <SelectItem value='👾'>👾</SelectItem>
            <SelectItem value='👹'>👹</SelectItem>
            <SelectItem value='👺'>👺</SelectItem>
            <SelectItem value='👿'>👿</SelectItem>
            <SelectItem value='💩'>💩</SelectItem>
            <SelectItem value='👶'>👶</SelectItem>
            <SelectItem value='👦'>👦</SelectItem>
            <SelectItem value='👧'>👧</SelectItem>
            <SelectItem value='🧒'>🧒</SelectItem>
            <SelectItem value='👩'>👩</SelectItem>
            <SelectItem value='🧑'>🧑</SelectItem>
            <SelectItem value='👨'>👨</SelectItem>
            <SelectItem value='👵'>👵</SelectItem>
            <SelectItem value='🧓'>🧓</SelectItem>
            <SelectItem value='👴'>👴</SelectItem>
            <SelectItem value='👲'>👲</SelectItem>
            <SelectItem value='👳'>👳</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default IconSelection;
