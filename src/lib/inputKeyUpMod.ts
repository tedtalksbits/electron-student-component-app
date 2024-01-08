export const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const value = e.currentTarget.value;
    e.currentTarget.value = `${value.substring(0, start)}  ${value.substring(
      end
    )}`;
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
  }

  // add corresponding closing element when user types opening element
  if (e.key === '{') {
    e.preventDefault();
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const value = e.currentTarget.value;
    e.currentTarget.value = `${value.substring(0, start)}{}${value.substring(
      end
    )}`;
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
  }

  // add corresponding closing element when user types opening element
  if (e.key === '[') {
    e.preventDefault();
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const value = e.currentTarget.value;
    e.currentTarget.value = `${value.substring(0, start)}[]${value.substring(
      end
    )}`;
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
  }

  // add corresponding closing element when user types opening element
  if (e.key === '"') {
    e.preventDefault();
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const value = e.currentTarget.value;
    e.currentTarget.value = `${value.substring(0, start)}""${value.substring(
      end
    )}`;
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
  }
};
