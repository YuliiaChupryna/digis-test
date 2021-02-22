import {SET_CITY_FORECAST_IS_ERROR, SET_CITY_FORECAST_IS_LOADING, SET_CITY_FORECAST_DATA} from "./constants";

export const setCityForecastData = data => ({
    type: SET_CITY_FORECAST_DATA,
    data
});

export const setCityForecastIsLoading = value => ({
    type: SET_CITY_FORECAST_IS_LOADING,
    value
});

export const setCityForecastIsError = value => ({
    type: SET_CITY_FORECAST_IS_ERROR,
    value
});

const initialState = {
    data: {},
    isError: false,
    isLoading: false
}

const cityForecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITY_FORECAST_DATA:
            return {
                ...state,
                data: action.data,
            };
        case SET_CITY_FORECAST_IS_LOADING:
            return {
                ...state,
                isLoading: action.value,
            };

        case SET_CITY_FORECAST_IS_ERROR:
            return {
                ...state,
                isError: action.value,
            };
        default:
            return {...state};
    }
};

export default cityForecastReducer;