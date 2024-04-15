import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export function navigate(name, params): void {
  navigationRef.current?.navigate(name, params);
}