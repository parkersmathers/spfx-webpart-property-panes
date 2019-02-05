import {
  Version,
  DisplayMode,
  Environment,
  EnvironmentType,
  Log
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloPropertyPaneWebPart.module.scss';
import * as strings from 'HelloPropertyPaneWebPartStrings';

import {
  PropertyPaneCoffeeshopSelector,
  IPropertyPaneCoffeeshopSelectorProps
} from '../../controls/PropertyPaneCoffeeshopSelector';

export interface IHelloPropertyPaneProps {
  description: string;
  myCoffeeshop: string;
}

export default class HelloPropertyPane extends BaseClientSideWebPart<IHelloPropertyPaneProps> {
  public render(): void {

    const pageMode: string = this.displayMode === DisplayMode.Edit
      ? 'Edit'
      : 'Read';

    const environmentType: string = Environment.type === EnvironmentType.Local
      ? 'Local'
      : 'Sharepoint';

    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">SharePoint Framework</span>
              <p class="${styles.subTitle}">w/ React.</p>
              <p class="${styles.description}">${escape(this.properties.description)}</p>
              <p class="${styles.description}">${escape(this.properties.myCoffeeshop)}</p>
              <a href="https://parkersmathers.github.io" class="${styles.button}">
              <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
          <div class="${styles.row}">
            <div class="${styles.column}">
              <p class="${styles.subTitle}"><strong>Page Mode:</strong> ${pageMode}</p>
              <p class="${styles.subTitle}"><strong>Environment:</strong> ${environmentType}</p>
            </div>
          </div>
        </div>
      </div>`;

    this.domElement
      .getElementsByClassName(`${styles.button}`)[0]
      .addEventListener('click', (event: any) => {
        event.preventDefault();
        alert('hello world');
      });

    Log.info('HelloWorld', 'message', this.context.serviceScope);
    Log.warn('HelloWorld', 'WARNING message', this.context.serviceScope);
    Log.error('HelloWorld', new Error('ERROR message'), this.context.serviceScope);
    Log.verbose('HelloWorld', 'verbose message', this.context.serviceScope);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                new PropertyPaneCoffeeshopSelector('myCoffeeshop', <IPropertyPaneCoffeeshopSelectorProps>{
                  label: 'Coffeeshop where I currently work',
                  disabled: false,
                  selectedKey: this.properties.myCoffeeshop,
                  onPropertyChange: this.onCoffeeshopSelectionChange.bind(this),
                }),
              ]
            }
          ]
        }
      ]
    };
  }
  
  private onCoffeeshopSelectionChange(propertyPath: string, newValue: any): void {
    const oldValue: any = this.properties[propertyPath];
    this.properties[propertyPath] = newValue;
    this.render();
  }
}
