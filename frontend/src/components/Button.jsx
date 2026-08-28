export function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer px-25 py-2 w-full bg-tertiary rounded 
            text-text-primary font-bold hover:bg-tertiary-hover transition 
            duration-300 ease-in-out"
    >
      {text}
    </button>
  );
}
