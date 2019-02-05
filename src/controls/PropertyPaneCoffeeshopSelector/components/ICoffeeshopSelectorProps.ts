import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface ICoffeeshopSelectorProps {
  label: string;
  onChanged: (option: IDropdownOption, index?: number) => void;
  selectedKey: string | number;
  disabled: boolean;
  stateKey: string;
}
