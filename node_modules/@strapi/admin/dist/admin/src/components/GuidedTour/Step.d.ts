import * as React from 'react';
import { Popover, FlexProps } from '@strapi/design-system';
import { type MessageDescriptor } from 'react-intl';
import { type ValidTourName } from './Context';
type WithChildren = {
    children: React.ReactNode;
    id?: never;
    defaultMessage?: never;
};
type WithIntl = {
    children?: undefined;
    id: MessageDescriptor['id'];
    defaultMessage: MessageDescriptor['defaultMessage'];
    withArrow?: boolean;
};
type WithActionsChildren = {
    children: React.ReactNode;
    showStepCount?: boolean;
    showSkip?: boolean;
};
type WithActionsProps = {
    children?: undefined;
    showStepCount?: boolean;
    showSkip?: boolean;
};
type StepProps = WithChildren | WithIntl;
type ActionsProps = WithActionsChildren | WithActionsProps;
type Step = {
    Root: React.ForwardRefExoticComponent<React.ComponentProps<typeof Popover.Content> & {
        withArrow?: boolean;
    }>;
    Title: (props: StepProps) => React.ReactNode;
    Content: (props: StepProps) => React.ReactNode;
    Actions: (props: ActionsProps & {
        to?: string;
    } & FlexProps) => React.ReactNode;
};
export declare const StepCount: ({ tourName }: {
    tourName: ValidTourName;
}) => import("react/jsx-runtime").JSX.Element;
declare const createStepComponents: (tourName: ValidTourName) => Step;
export type { Step };
export { createStepComponents };
