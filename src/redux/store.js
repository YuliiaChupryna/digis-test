import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import cityForecastReducer from './cityForecastReducer';

export const getCityForecastInfo = state => state.cityForecastInfo;

const rootReducer = combineReducers({
    cityForecastInfo: cityForecastReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;