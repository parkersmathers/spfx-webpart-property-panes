import * as React from 'react';
import {
  Dropdown,
  IDropdownOption
} from 'office-ui-fabric-react/lib/components/Dropdown';
import { ICoffeeshopSelectorProps } from './ICoffeeshopSelectorProps';
import { ICoffeeshopSelectorState } from './ICoffeeshopSelectorState';

export default class CoffeeshopSelector extends React.Component<ICoffeeshopSelectorProps, ICoffeeshopSelectorState> {
  private selectedKey: React.ReactText;

  constructor(props: ICoffeeshopSelectorProps, state: ICoffeeshopSelectorState) {
    super(props);
    this.selectedKey = props.selectedKey;
    this.state = { options: [] };
  }

  public componentDidMount(): void {
    this.loadOptions();
  }

  public loadOptions(): void {
    let coffeeshops: IDropdownOption[] = [
      { "key": "Cool Beans", "text": "Cool Beans" },
      { "key": "Chattahoochie Coffee Company", "text": "Chattahoochie Coffee Company" },
      { "key": "Rev Coffee", "text": "Rev Coffee" },
    ];
    this.setState({ options: coffeeshops });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Dropdown label={this.props.label}
          disabled={this.props.disabled}
          selectedKey={this.selectedKey}
          options={this.state.options}
          onChanged={this.onChanged.bind(this)} />
      </div>
    );
  }

  private onChanged(option: IDropdownOption, index?: number): void {
    this.selectedKey = option.key;
    const options: IDropdownOption[] = this.state.options;
    options.forEach((opt: IDropdownOption): void => {
      if (opt.key !== option.key) {
        opt.selected = false;
      }
    });
    this.setState((prevState: ICoffeeshopSelectorState, props: ICoffeeshopSelectorProps): ICoffeeshopSelectorState => {
      prevState.options = options;
      return prevState;
    });
    if (this.props.onChanged) {
      this.props.onChanged(option, index);
    }
  }

}