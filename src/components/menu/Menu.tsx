import { useEffect, useState, useRef, Fragment } from 'react';
type MenuItem = {
  label: string;
  icon: string | React.ReactNode;
  onClick: () => void;
};

type MenuProps = {
  menuItems: MenuItem[];
  menuButtonLabel?: string;
};
export default function Menu({ menuItems, menuButtonLabel }: MenuProps) {
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    document.addEventListener('click', (e) => {
      if (
        !menuButton.current?.contains(e.target as Node) &&
        !menu.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='relative h-[2.5rem]'>
      <button ref={menuButton} onClick={handleClick}>
        {menuButtonLabel || 'Menu'}
      </button>
      {isOpen && (
        <div
          ref={menu}
          className='absolute top-[2.5rem] right-0 bg-neutral-700 border rounded-md p-1 w-[250px] text-left z-10'
        >
          <ul className='flex flex-col gap-2'>
            {menuItems.map((item, i) => (
              <Fragment key={item.label}>
                <li>
                  <button
                    className='w-full bg-transparent hover:bg-neutral-600 rounded-md p-2 text-left capitalize flex gap-1'
                    onClick={item.onClick}
                  >
                    {item.icon && <div className='h-5 w-5'>{item.icon}</div>}
                    {item.label}
                  </button>
                </li>
                {i + 1 < menuItems.length && <hr />}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
