import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { produce } from 'immer';
import { usePersistentState } from '../../hooks/usePersistentState.mjs';
import { createContext } from '../Context.mjs';
import { tours } from './Tours.mjs';

const [GuidedTourProviderImpl, useGuidedTour] = createContext('GuidedTour');
const getInitialTourState = (tours)=>{
    return Object.keys(tours).reduce((acc, tourName)=>{
        const tourLength = Object.keys(tours[tourName]).length;
        acc[tourName] = {
            currentStep: 0,
            length: tourLength,
            isCompleted: false
        };
        return acc;
    }, {});
};
function reducer(state, action) {
    return produce(state, (draft)=>{
        if (action.type === 'next_step') {
            const nextStep = draft.tours[action.payload].currentStep + 1;
            draft.tours[action.payload].currentStep = nextStep;
            draft.tours[action.payload].isCompleted = nextStep === draft.tours[action.payload].length;
        }
        if (action.type === 'skip_tour') {
            draft.tours[action.payload].isCompleted = true;
        }
        if (action.type === 'set_completed_actions') {
            draft.completedActions = [
                ...new Set([
                    ...draft.completedActions,
                    ...action.payload
                ])
            ];
        }
        if (action.type === 'skip_all_tours') {
            draft.enabled = false;
        }
        if (action.type === 'reset_all_tours') {
            draft.enabled = true;
            draft.tours = getInitialTourState(tours);
            draft.completedActions = [];
        }
    });
}
const STORAGE_KEY = 'STRAPI_GUIDED_TOUR';
const GuidedTourContext = ({ children, enabled = true })=>{
    const [tours$1, setTours] = usePersistentState(STORAGE_KEY, {
        tours: getInitialTourState(tours),
        enabled,
        completedActions: []
    });
    const [state, dispatch] = React.useReducer(reducer, tours$1);
    // Sync local storage
    React.useEffect(()=>{
        setTours(state);
    }, [
        state,
        setTours
    ]);
    return /*#__PURE__*/ jsx(GuidedTourProviderImpl, {
        state: state,
        dispatch: dispatch,
        children: children
    });
};

export { GuidedTourContext, reducer, useGuidedTour };
//# sourceMappingURL=Context.mjs.map
