'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var designSystem = require('@strapi/design-system');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
var Tracking = require('../../features/Tracking.js');
var Context = require('./Context.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const ActionsContainer = styled.styled(designSystem.Flex)`
  border-top: ${({ theme })=>`1px solid ${theme.colors.neutral150}`};
`;
/**
 * TODO:
 * We should probably move all arrow styles + svg to the DS
 */ const PopoverArrow = styled.styled(designSystem.Popover.Arrow)`
  fill: ${({ theme })=>theme.colors.neutral0};
  transform: translateY(-16px) rotate(-90deg);
`;
const StepCount = ({ tourName })=>{
    const state = Context.useGuidedTour('GuidedTourPopover', (s)=>s.state);
    const currentStep = state.tours[tourName].currentStep + 1;
    // TODO: Currently all tours do not count their last step, but we should find a way to make this more smart
    const displayedLength = state.tours[tourName].length - 1;
    return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
        variant: "omega",
        fontSize: "12px",
        children: /*#__PURE__*/ jsxRuntime.jsx(reactIntl.FormattedMessage, {
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
        Root: /*#__PURE__*/ React__namespace.forwardRef(({ withArrow = true, ...props }, ref)=>{
            return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Popover.Content, {
                ref: ref,
                "aria-labelledby": "guided-tour-title",
                side: "top",
                align: "center",
                style: {
                    border: 'none'
                },
                ...props,
                children: [
                    withArrow && /*#__PURE__*/ jsxRuntime.jsx(PopoverArrow, {
                        asChild: true,
                        children: /*#__PURE__*/ jsxRuntime.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "23",
                            height: "25",
                            viewBox: "0 0 23 25",
                            fill: "none",
                            children: /*#__PURE__*/ jsxRuntime.jsx("path", {
                                d: "M11 24.5L1.82843 15.3284C0.266332 13.7663 0.26633 11.2337 1.82843 9.67157L11 0.5L23 12.5L11 24.5Z"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                        width: "360px",
                        direction: "column",
                        alignItems: "start",
                        children: props.children
                    })
                ]
            });
        }),
        Title: (props)=>{
            return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 1,
                width: "100%",
                children: 'children' in props ? props.children : /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                    tag: "h1",
                    id: "guided-tour-title",
                    variant: "omega",
                    fontWeight: "bold",
                    children: /*#__PURE__*/ jsxRuntime.jsx(reactIntl.FormattedMessage, {
                        id: props.id,
                        defaultMessage: props.defaultMessage
                    })
                })
            });
        },
        Content: (props)=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                paddingBottom: 5,
                paddingLeft: 5,
                paddingRight: 5,
                width: "100%",
                children: 'children' in props ? props.children : /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                    tag: "div",
                    variant: "omega",
                    children: /*#__PURE__*/ jsxRuntime.jsx(reactIntl.FormattedMessage, {
                        id: props.id,
                        defaultMessage: props.defaultMessage
                    })
                })
            }),
        Actions: ({ showStepCount = true, showSkip = false, to, children, ...flexProps })=>{
            const { trackUsage } = Tracking.useTracking();
            const dispatch = Context.useGuidedTour('GuidedTourPopover', (s)=>s.dispatch);
            const state = Context.useGuidedTour('GuidedTourPopover', (s)=>s.state);
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
            return /*#__PURE__*/ jsxRuntime.jsx(ActionsContainer, {
                width: "100%",
                padding: 3,
                paddingLeft: 5,
                justifyContent: showStepCount ? 'space-between' : 'flex-end',
                ...flexProps,
                children: children ? children : /*#__PURE__*/ jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                        showStepCount && /*#__PURE__*/ jsxRuntime.jsx(StepCount, {
                            tourName: tourName
                        }),
                        /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                            gap: 2,
                            children: [
                                showSkip && /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
                                    variant: "tertiary",
                                    onClick: handleSkipAction,
                                    children: /*#__PURE__*/ jsxRuntime.jsx(reactIntl.FormattedMessage, {
                                        id: "tours.skip",
                                        defaultMessage: "Skip"
                                    })
                                }),
                                to ? /*#__PURE__*/ jsxRuntime.jsx(designSystem.LinkButton, {
                                    tag: reactRouterDom.NavLink,
                                    to: to,
                                    onClick: handleNextStep,
                                    children: /*#__PURE__*/ jsxRuntime.jsx(reactIntl.FormattedMessage, {
                                        id: "tours.next",
                                        defaultMessage: "Next"
                                    })
                                }) : /*#__PURE__*/ jsxRuntime.jsx(designSystem.Button, {
                                    onClick: handleNextStep,
                                    children: /*#__PURE__*/ jsxRuntime.jsx(reactIntl.FormattedMessage, {
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

exports.StepCount = StepCount;
exports.createStepComponents = createStepComponents;
//# sourceMappingURL=Step.js.map
