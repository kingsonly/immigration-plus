import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Box, Portal, Popover, Button } from '@strapi/design-system';
import { FormattedMessage } from 'react-intl';
import { styled } from 'styled-components';
import { useGetGuidedTourMetaQuery } from '../../services/admin.mjs';
import { useGuidedTour } from './Context.mjs';
import { StepCount, createStepComponents } from './Step.mjs';

/* -------------------------------------------------------------------------------------------------
 * Tours
 * -----------------------------------------------------------------------------------------------*/ const GotItAction = ({ onClick })=>{
    return /*#__PURE__*/ jsx(Button, {
        onClick: onClick,
        children: /*#__PURE__*/ jsx(FormattedMessage, {
            id: "tours.gotIt",
            defaultMessage: "Got it"
        })
    });
};
const tours = {
    contentTypeBuilder: createTour('contentTypeBuilder', [
        {
            name: 'Introduction',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "bottom",
                    withArrow: false,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentTypeBuilder.Introduction.title",
                            defaultMessage: "Content-Type Builder"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentTypeBuilder.Introduction.content",
                            defaultMessage: "Create and manage your content structure with collection types, single types and components."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showSkip: true
                        })
                    ]
                })
        },
        {
            name: 'CollectionTypes',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "right",
                    sideOffset: 16,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentTypeBuilder.CollectionTypes.title",
                            defaultMessage: "Collection Types"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentTypeBuilder.CollectionTypes.content",
                            defaultMessage: "A content structure that can manage multiple entries, such as articles or products."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {})
                    ]
                })
        },
        {
            name: 'SingleTypes',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "right",
                    sideOffset: 16,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentTypeBuilder.SingleTypes.title",
                            defaultMessage: "Single Types"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentTypeBuilder.SingleTypes.content",
                            defaultMessage: "A content structure that can manage a single entry, such as a homepage or a header."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {})
                    ]
                })
        },
        {
            name: 'Components',
            content: (Step, { dispatch })=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "right",
                    sideOffset: 16,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentTypeBuilder.Components.title",
                            defaultMessage: "Components"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentTypeBuilder.Components.content",
                            defaultMessage: "A reusable content structure that can be used across multiple content types, such as buttons, sliders or cards."
                        }),
                        /*#__PURE__*/ jsxs(Step.Actions, {
                            children: [
                                /*#__PURE__*/ jsx(StepCount, {
                                    tourName: "contentTypeBuilder"
                                }),
                                /*#__PURE__*/ jsx(GotItAction, {
                                    onClick: ()=>dispatch({
                                            type: 'next_step',
                                            payload: 'contentTypeBuilder'
                                        })
                                })
                            ]
                        })
                    ]
                })
        },
        {
            name: 'Finish',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "right",
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentTypeBuilder.Finish.title",
                            defaultMessage: "It's time to create content!"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentTypeBuilder.Finish.content",
                            defaultMessage: "Now that you created content types, you'll be able to create content in the content manager."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showStepCount: false,
                            to: "/content-manager"
                        })
                    ]
                }),
            when: (completedActions)=>completedActions.includes('didCreateContentTypeSchema')
        }
    ]),
    contentManager: createTour('contentManager', [
        {
            name: 'Introduction',
            when: (completedActions)=>completedActions.includes('didCreateContentTypeSchema'),
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "top",
                    withArrow: false,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentManager.Introduction.title",
                            defaultMessage: "Content manager"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentManager.Introduction.content",
                            defaultMessage: "Create and manage content from your collection types and single types."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showSkip: true
                        })
                    ]
                })
        },
        {
            name: 'Fields',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    sideOffset: -12,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentManager.Fields.title",
                            defaultMessage: "Fields"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentManager.Fields.content",
                            defaultMessage: "Add content to the fields created in the Content-Type Builder."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {})
                    ]
                })
        },
        {
            name: 'Publish',
            content: (Step, { dispatch })=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "left",
                    align: "center",
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentManager.Publish.title",
                            defaultMessage: "Publish"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentManager.Publish.content",
                            defaultMessage: "Publish entries to make their content available through the Document Service API."
                        }),
                        /*#__PURE__*/ jsxs(Step.Actions, {
                            children: [
                                /*#__PURE__*/ jsx(StepCount, {
                                    tourName: "contentManager"
                                }),
                                /*#__PURE__*/ jsx(GotItAction, {
                                    onClick: ()=>dispatch({
                                            type: 'next_step',
                                            payload: 'contentManager'
                                        })
                                })
                            ]
                        })
                    ]
                })
        },
        {
            name: 'Finish',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "right",
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.contentManager.FinalStep.title",
                            defaultMessage: "It's time to create API Tokens!"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.contentManager.FinalStep.content",
                            defaultMessage: "Now that you've created and published content, time to create API tokens and set up permissions."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showStepCount: false,
                            to: "/settings/api-tokens"
                        })
                    ]
                }),
            when: (completedActions)=>completedActions.includes('didCreateContent')
        }
    ]),
    apiTokens: createTour('apiTokens', [
        {
            name: 'Introduction',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    sideOffset: -36,
                    withArrow: false,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.apiTokens.Introduction.title",
                            defaultMessage: "API tokens"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.apiTokens.Introduction.content",
                            defaultMessage: "Create and manage API tokens with highly customizable permissions."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showSkip: true
                        })
                    ]
                })
        },
        {
            name: 'CreateAnAPIToken',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "bottom",
                    align: "end",
                    sideOffset: -10,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.apiTokens.CreateAnAPIToken.title",
                            defaultMessage: "Create an API token"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.apiTokens.CreateAnAPIToken.content",
                            defaultMessage: "Create a new API token. Choose a name, duration and type."
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {})
                    ]
                })
        },
        {
            name: 'CopyAPIToken',
            content: (Step, { dispatch })=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "bottom",
                    align: "start",
                    sideOffset: -5,
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.apiTokens.CopyAPIToken.title",
                            defaultMessage: "Copy your new API token"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.apiTokens.CopyAPIToken.content",
                            defaultMessage: "Make sure to do it now, you won’t be able to see it again. You’ll need to generate a new one if you lose it."
                        }),
                        /*#__PURE__*/ jsxs(Step.Actions, {
                            children: [
                                /*#__PURE__*/ jsx(StepCount, {
                                    tourName: "apiTokens"
                                }),
                                /*#__PURE__*/ jsx(GotItAction, {
                                    onClick: ()=>dispatch({
                                            type: 'next_step',
                                            payload: 'apiTokens'
                                        })
                                })
                            ]
                        })
                    ]
                }),
            when: (completedActions)=>completedActions.includes('didCreateApiToken')
        },
        {
            name: 'Finish',
            content: (Step)=>/*#__PURE__*/ jsxs(Step.Root, {
                    side: "right",
                    align: "start",
                    children: [
                        /*#__PURE__*/ jsx(Step.Title, {
                            id: "tours.apiTokens.FinalStep.title",
                            defaultMessage: "It's time to deploy your application!"
                        }),
                        /*#__PURE__*/ jsx(Step.Content, {
                            id: "tours.apiTokens.FinalStep.content",
                            defaultMessage: "Your application is ready to be deployed and its content to be shared with the world!"
                        }),
                        /*#__PURE__*/ jsx(Step.Actions, {
                            showStepCount: false,
                            to: "/"
                        })
                    ]
                }),
            when: (completedActions)=>completedActions.includes('didCopyApiToken')
        }
    ]),
    strapiCloud: createTour('strapiCloud', [])
};
const GuidedTourTooltip = ({ children, ...props })=>{
    const state = useGuidedTour('TooltipWrapper', (s)=>s.state);
    if (!state.enabled) {
        return /*#__PURE__*/ jsx(Fragment, {
            children: children
        });
    }
    return /*#__PURE__*/ jsx(GuidedTourTooltipImpl, {
        ...props,
        children: children
    });
};
const GuidedTourOverlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 50, 77, 0.2);
  z-index: 10;
`;
const GuidedTourTooltipImpl = ({ children, content, tourName, step, when })=>{
    const { data: guidedTourMeta } = useGetGuidedTourMetaQuery();
    const state = useGuidedTour('GuidedTourTooltip', (s)=>s.state);
    const dispatch = useGuidedTour('GuidedTourTooltip', (s)=>s.dispatch);
    const isCurrentStep = state.tours[tourName].currentStep === step;
    const isStepConditionMet = when ? when(state.completedActions) : true;
    const isPopoverOpen = guidedTourMeta?.data?.isFirstSuperAdminUser && !state.tours[tourName].isCompleted && isCurrentStep && isStepConditionMet;
    // Lock the scroll
    React.useEffect(()=>{
        if (!isPopoverOpen) return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = originalStyle;
        };
    }, [
        isPopoverOpen
    ]);
    // TODO: This isn't great but the only solution for syncing the completed actions
    React.useEffect(()=>{
        dispatch({
            type: 'set_completed_actions',
            payload: guidedTourMeta?.data?.completedActions ?? []
        });
    }, [
        dispatch,
        guidedTourMeta?.data?.completedActions
    ]);
    const Step = React.useMemo(()=>createStepComponents(tourName), [
        tourName
    ]);
    return /*#__PURE__*/ jsxs(Fragment, {
        children: [
            isPopoverOpen && /*#__PURE__*/ jsx(Portal, {
                children: /*#__PURE__*/ jsx(GuidedTourOverlay, {})
            }),
            /*#__PURE__*/ jsxs(Popover.Root, {
                open: isPopoverOpen,
                children: [
                    /*#__PURE__*/ jsx(Popover.Anchor, {
                        children: children
                    }),
                    content(Step, {
                        state,
                        dispatch
                    })
                ]
            })
        ]
    });
};
function createTour(tourName, steps) {
    const tour = steps.reduce((acc, step, index)=>{
        if (step.name in acc) {
            throw Error(`The tour: ${tourName} with step: ${step.name} has already been registered`);
        }
        acc[step.name] = ({ children })=>{
            return /*#__PURE__*/ jsx(GuidedTourTooltip, {
                tourName: tourName,
                step: index,
                content: step.content,
                when: step.when,
                children: children
            });
        };
        return acc;
    }, {});
    return tour;
}

export { tours };
//# sourceMappingURL=Tours.mjs.map
