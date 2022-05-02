import { Button } from './styles';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface SwitchProps {
  toggleTheme: () => void
  checked: boolean
}

export default function Switch({ toggleTheme, checked }: SwitchProps) {
  return (
    <Button
      type="button"
      onClick={toggleTheme}
      checked={checked}
    >
      <span />
    </Button>
  );
}
