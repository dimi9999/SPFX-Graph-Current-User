import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MsGraphCurrentUserWebPartStrings';
import MsGraphCurrentUser from './components/MsGraphCurrentUser';
import { IMsGraphCurrentUserProps } from './components/IMsGraphCurrentUserProps';

import { MSGraphClient } from '@microsoft/sp-http';

export interface IMsGraphCurrentUserWebPartProps {
  description: string;
}

export default class MsGraphCurrentUserWebPart extends BaseClientSideWebPart <IMsGraphCurrentUserWebPartProps> {

  public render(): void {
    this.context.msGraphClientFactory.getClient()
.then((client: MSGraphClient): void => {
    const element: React.ReactElement<IMsGraphCurrentUserProps> = React.createElement(
        MsGraphCurrentUser,
          {
            graphClient: client
          }
    );

    ReactDom.render(element, this.domElement);
      });
    }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
