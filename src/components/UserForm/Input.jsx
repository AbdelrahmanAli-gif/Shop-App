function Input({ id, type, value, onChange, children }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        required
        className="border-2 rounded-md py-1 px-2 text-xs md:text-sm"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

export default Input;
