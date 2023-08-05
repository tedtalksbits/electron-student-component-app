import { randomId } from '@/utils/randomId';
const id = randomId();

const CheckboxToggle = ({ ...props }) => {
  return (
    <div>
      <input className='checkbox-input' type='checkbox' {...props} />
      <label className='checkbox-label' htmlFor={props.id}></label>
    </div>
  );
};

export default CheckboxToggle;
