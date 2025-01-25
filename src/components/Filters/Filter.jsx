import Checkbox from "./Checkbox";

function Filter({ title, labels, params, setParams }) {
  return (
    <div className="w-3/4">
      <p className="text-sm sm:text-l md:text-xl">{title}</p>
      {labels.map((label, i) => {
        return (
          <Checkbox
            label={label}
            key={i}
            params={params}
            setParams={setParams}
          />
        );
      })}
    </div>
  );
}

export default Filter;
