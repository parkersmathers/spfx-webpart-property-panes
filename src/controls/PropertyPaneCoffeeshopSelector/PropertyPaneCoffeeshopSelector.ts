import * as React from 'react';
import * as ReactDom from 'react-dom';
import { 
  IPropertyPaneField, 
  PropertyPaneFieldType 
} from '@microsoft/sp-webpart-base';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ICoffeeshopSelectorProps } from './components/ICoffeeshopSelectorProps';
import CoffeeshopSelector from './components/CoffeeshopSelector';
import { IPropertyPaneCoffeeshopSelectorProps, IPropertyPaneCoffeeshopSelectorInternalProps } from './index';

export class PropertyPaneCoffeeshopSelector implements IPropertyPaneField<IPropertyPaneCoffeeshopSelectorProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyPaneCoffeeshopSelectorInternalProps;
  private element: HTMLElement;

  constructor(public targetProperty: string, properties: IPropertyPaneCoffeeshopSelectorProps) {
    this.properties = {
      key: properties.label,
      label: properties.label,
      disabled: properties.disabled,
      selectedKey: properties.selectedKey,
      onPropertyChange: properties.onPropertyChange,
      onRender: this.onRender.bind(this)
    };
  }

  public render(): void {
    if (!this.element) {
      return;
    }
  }

  private onRender(element: HTMLElement): void {
    if (!this.element) {
      this.element = element;
    }

    const reactElement: React.ReactElement<ICoffeeshopSelectorProps> = React.createElement(CoffeeshopSelector, <ICoffeeshopSelectorProps>{
      label: this.properties.label,
      onChanged: this.onChanged.bind(this),
      selectedKey: this.properties.selectedKey,
      disabled: this.properties.disabled,
      stateKey: new Date().toString() // hack to allow for externally triggered re-rendering
    });
    ReactDom.render(reactElement, element);
  }

  private onChanged(option: IDropdownOption, index?: number): void {
    this.properties.onPropertyChange(this.targetProperty, option.key);
  }
}