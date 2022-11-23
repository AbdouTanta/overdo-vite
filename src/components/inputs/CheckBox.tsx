function CheckBox({
  text,
  label,
  register,
}: {
  text: string;
  label: string;
  register: any;
}) {
  return (
    <>
      <input type="checkbox" id={label} {...register(label)} />
      <label htmlFor={label} className="text-sm font-normal">
        {text}
      </label>
    </>
  );
}

export default CheckBox;
