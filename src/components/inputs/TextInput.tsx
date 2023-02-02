/* eslint-disable react/require-default-props */
function TextInput({
  label,
  id,
  defaultValue,
  register,
  validationSchema,
}: {
  label: string;
  id: string;
  defaultValue?: string;
  register: any;
  validationSchema: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        id={id}
        className="rounded-lg bg-gray-200 p-2 text-gray-500 focus:outline-none"
        {...register(id, validationSchema)}
      />
    </div>
  );
}

export default TextInput;
