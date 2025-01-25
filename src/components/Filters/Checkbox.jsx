function Checkbox({ label, params, setParams }) {
  const { id, name } = label;

  const handleChecked = () => {
    const updatedParams = params;
    updatedParams[id] = !updatedParams[id];
    setParams({ ...updatedParams });
  };

  return (
    <div className="text-xs sm:text-sm md:text-base flex items-center gap-2">
      <input
        type="checkbox"
        checked={params[id]}
        onChange={handleChecked}
        id={id}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}

export default Checkbox;
