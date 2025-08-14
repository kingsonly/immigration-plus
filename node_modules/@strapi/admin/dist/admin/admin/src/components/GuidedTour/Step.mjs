import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Flex, Popover, Typography, Box, Button, LinkButton } from '@strapi/design-system';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useTracking } from '../../features/Tracking.mjs';
import { useGuidedTour } from './Context.mjs';

const ActionsContainer = styled(Flex)`
  border-top: ${({ theme })=>`1px solid ${theme.colors.neutral150}`};
`;
/**
 * TODO:
 * We should probably move all arrow styles + svg to the DS
 */ const PopoverArrow = styled(Popover.Arrow)`
  fill: ${({ theme })=>theme.colors.neutral0};
  transform: translateY(-16px) rotate(-90deg);
`;
const StepCount = ({ tourName })=>{
    const state = useGuidedTour('GuidedTourPopover', (s)=>s.state);
    const currentStep = state.tours[tourName].currentStep + 1;
    // TODO: Currently all tours do not count their last step, but we should find a way to make this more smart
    const displayedLength = state.tours[tourName].length - 1;
    return /*#__PURE__*/ jsx(Typography, {
        variant: "omega",
        fontSize: "12px",
        children: /*#__PURE__*/ jsx(FormattedMessage, {
            id: "tours.stepCount",
            defaultMessage: "Step {currentStep} of {tourLength}",
            values: {
                currentStep,
                tourLength: displayedLength
            }
        })
    });
};
const createStepComponents = (tourName)=>({
        Root: /*#__PURE__*/ React.forwardRef(({ withArrow = true, ...props }, ref)=>{
            return /*#__PURE__*/ jsxs(Popover.Content, {
                ref: ref,
                "aria-labelledby": "guided-tour-title",
                side: "top",
                align: "center",
                style: {
                    border: 'none'
                },
                ...props,
                children: [
                    withArrow && /*#__PURE__*/ jsx(PopoverArrow, {
                        asChild: true,
                        children: /*#__PURE__*/ jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "23",
                            height: "25",
                            viewBox: "0 0 23 25",
                            fill: "none",
                            children: /*#__PURE__*/ jsx("path", {
                                d: "M11 24.5L1.82843 15.3284C0.266332 13.7663 0.26633 11.2337 1.82843 9.67157L11 0.5L23 12.5L11 24.5Z"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx(Flex, {
                        width: "360px",
                        direction: "column",
                        alignItems: "start",
                        children: props.children
                    })
                ]
            });
        }),
        Title: (props)=>{
            return /*#__PURE__*/ jsx(Box, {
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 1,
                width: "100%",
                children: 'children' in props ? props.children : /*#__PURE__*/ jsx(Typography, {
                    tag: "h1",
                    id: "guided-tour-title",
                    variant: "omega",
                    fontWeight: "bold",
                    children: /*#__PURE__*/ jsx(FormattedMessage, {
                        id: props.id,
                        defaultMessage: props.defaultMessage
                    })
                })
            });
        },
        Content: (props)=>/*#__PURE__*/ jsx(Box, {
                paddingBottom: 5,
                paddingLeft: 5,
                paddingRight: 5,
                width: "100%",
                children: 'children' in props ? props.children : /*#__PURE__*/ jsx(Typography, {
                    tag: "div",
                    variant: "omega",
                    children: /*#__PURE__*/ jsx(FormattedMessage, {
                        id: props.id,
                        defaultMessage: props.defaultMessage
                    })
                })
            }),
        Actions: ({ showStepCount = true, showSkip = false, to, children, ...flexProps })=>{
            const { trackUsage } = useTracking();
            const dispatch = useGuidedTour('GuidedTourPopover', (s)=>s.dispatch);
            const state = useGuidedTour('GuidedTourPopover', (s)=>s.state);
            const currentStep = state.tours[tourName].currentStep + 1;
            const actualTourLength = state.tours[tourName].length;
            const handleSkipAction = ()=>{
                trackUsage('didSkipGuidedTour', {
                    name: tourName
                });
                dispatch({
                    type: 'skip_tour',
                    payload: tourName
                });
            };
            const handleNextStep = ()=>{
                if (currentStep === actualTourLength) {
                    trackUsage('didCompleteGuidedTour', {
                        name: tourName
                    });
                }
                dispatch({
                    type: 'next_step',
                    payload: tourName
                });
            };
            return /*#__PURE__*/ jsx(ActionsContainer, {
                width: "100%",
                padding: 3,
                paddingLeft: 5,
                justifyContent: showStepCount ? 'space-between' : 'flex-end',
                ...flexProps,
                children: children ? children : /*#__PURE__*/ jsxs(Fragment, {
                    children: [
                        showStepCount && /*#__PURE__*/ jsx(StepCount, {
                            tourName: tourName
                        }),
                        /*#__PURE__*/ jsxs(Flex, {
                            gap: 2,
                            children: [
                                showSkip && /*#__PURE__*/ jsx(Button, {
                                    variant: "tertiary",
                                    onClick: handleSkipAction,
                                    children: /*#__PURE__*/ jsx(FormattedMessage, {
                                        id: "tours.skip",
                                        defaultMessage: "Skip"
                                    })
                                }),
                                to ? /*#__PURE__*/ jsx(LinkButton, {
                                    tag: NavLink,
                                    to: to,
                                    onClick: handleNextStep,
                                    children: /*#__PURE__*/ jsx(FormattedMessage, {
                                        id: "tours.next",
                                        defaultMessage: "Next"
                                    })
                                }) : /*#__PURE__*/ jsx(Button, {
                                    onClick: handleNextStep,
                                    children: /*#__PURE__*/ jsx(FormattedMessage, {
                                        id: "tours.next",
                                        defaultMessage: "Next"
                                    })
                                })
                            ]
                        })
                    ]
                })
            });
        }
    });

export { StepCount, createStepComponents };
//# sourceMappingURL=Step.mjs.map
