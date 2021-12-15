import React, { FC } from 'react';
import s from './FormButton.module.css';
import { IButton } from '../../interfaces/IButton';

interface Props {
   type?: string,
  onClick?: () => void,
  disabled?: boolean,
  children?: any
}

const FormButton: FC<Props> = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  ...allProps
}: IButton) => {
  return (
    <button
      type={type}
      className={s.button}
      disabled={disabled}
      onClick={onClick}
      {...allProps}
    >
      {children}
    </button>
  );
}

export default FormButton;

