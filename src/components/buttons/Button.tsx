/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { MouseEventHandler } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'warning' | 'danger';

interface ButtonProps {
  text: string;
  color: ButtonColor;
  onClick: MouseEventHandler;
}

function Button({ text, color, onClick }: ButtonProps) {
  return (
    <div
      className={clsx('cursor-pointer rounded-lg p-2 font-medium hover:shadow-md outline outline-2', {
        'bg-green-100 text-green-600 outline-green-400/50': color === 'primary',
        'text-gray-600 outline-gray-400/50': color === 'secondary',
        'bg-orange-100 text-orange-600 outline-orange-400/50': color === 'warning',
        'bg-red-100 text-red-600 outline-red-400/50': color === 'danger'
      })}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
