import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import PropTypes from 'prop-types';
import { setCityForecastData, setCityForecastIsError, setCityForecastIsLoading } from "../redux/cityForecastReducer";
import { getCityForecastInfo } from '../redux/store';
import SearchForm from "./SearchForm";
import BarChartXY from "./BarChartXY";
import { API_KEY } from "../redux/constants";

const getTempAndTimeXYData = (list) => {
    const result = [];
    list.forEach((item) => {
        result.push({
            xData: item.dt_txt.split(' ')[1].slice(0, 5),
            yData: item.main.temp,
        })
    });

    return result;
};

const CitiesTemperatureFinder = ({
    cityForecastInfo,
    setCityForecastData,
    setCityForecastIsError,
    setCityForecastIsLoading
}) => {

    const getCityForecastInfoFromServer = (value) => {
        setCityForecastIsError(false);
        setCityForecastIsLoading(true);

        axios({
            method: "get",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}`,
        }).then((response) => {
            setCityForecastData( {...response.data});
        }).catch(() => {
            setCityForecastData({});
            setCityForecastIsError(true);
        }).finally(() =>{
            setCityForecastIsLoading(false);
        })
    }

    return (
        <>
            <SearchForm
                onSubmit={getCityForecastInfoFromServer}
                isError={cityForecastInfo.isError}
                isLoading={cityForecastInfo.isLoading}
                setIsError={setCityForecastIsError}
            />

            {Object.keys(cityForecastInfo.data).length > 0 && (
                <BarChartXY
                    info={getTempAndTimeXYData([...cityForecastInfo.data.list])}
                    yName="temperature"
                    title={`Temperature for ${cityForecastInfo.data.city.name}`}
                />
            )}
        </>
    );
};

const mapStateToProps = state => ({
    cityForecastInfo: getCityForecastInfo(state)
});

const mapDispatchToProps = {
    setCityForecastData,
    setCityForecastIsLoading,
    setCityForecastIsError
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesTemperatureFinder);

CitiesTemperatureFinder.propTypes = {
    cityForecastInfo: PropTypes.shape({
        data: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({
                dt_txt: PropTypes.string,
                main: PropTypes.arrayOf(PropTypes.shape({
                    temp: PropTypes.number,
                })),
            })),
            city: PropTypes.shape({
                name: PropTypes.string,
            })
        }),
        isError: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired
    }),
    setCityForecastIsError: PropTypes.func.isRequired,
    setCityForecastIsLoading: PropTypes.func.isRequired,
    setCityForecastData: PropTypes.func.isRequired
};