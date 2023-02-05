/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';

function Button({
  text,
  isPrimary = false,
  isDelete = false,
  onClick,
}: {
  text: string;
  isPrimary?: boolean;
  isDelete?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={clsx({
        'cursor-pointer rounded-lg p-2 font-medium hover:shadow-md': true,
        'bg-green-100 text-green-600 outline outline-2 outline-green-400/50':
          isPrimary,
        'text-gray-600 outline outline-2 outline-gray-400/50': !isPrimary,
        'bg-red-100 text-red-600 outline outline-2 outline-red-400/50':
          isDelete,
      })}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
