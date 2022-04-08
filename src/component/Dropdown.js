

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label className="text-muted mx-2 ">
      {label}
      <select value={value} onChange={onChange} className="btn btn-secondary btn-g mx-1">
        {options.map((option) => (
          <option value={option.value} key={option.value} className="text-danger">{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;