import React, { useEffect, useState } from 'react';
import logo from '../../../logo-420-x-108.png';
import { ISignUpParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import SignUpForm from '../components/SignUpForm';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState([]);
    const [states, setStates] = useState([]);
    const [idRegion, setIdRegion] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm();

    const getLocation = React.useCallback(async (idRegion?: string) => {
        setLoading(true);

        const json = await dispatch(
            fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get'),
        );

        setLoading(false);

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            console.log(json.data);

            idRegion ? setStates(json.data) : setLocations(json.data);
            return;
        }
    }, []);

    useEffect(() => {
        getLocation(idRegion);
    }, [getLocation, idRegion]);

    function toastMessage(json: string) {
        console.log(json)
        if (json.trim() === "OK") {
            toast.success("SingUp user sucess!", {
                autoClose: 3000,
            })
        } else {
            toast.error(json, {
                autoClose: 3000,
            })
        }
    }

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(
                fetchThunk(API_PATHS.signUp, 'post', values),
            );
            // console.log("json", json);

            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                dispatch(setUserInfo(json.data));
                

                // Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
                await toastMessage(json.message);

                dispatch(replace(ROUTES.home));
                return;
            } else {
                toastMessage(json.message)
            }

            // setErrorMessage(getErrorMessageResponse(json));
        },
        [dispatch],
    );

    // const onChangeRegion = (idRegion: string) => {
    //     setIdRegion(idRegion);
    // };

    return (
        <div
            className="container"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

            <SignUpForm
                onSignUp={onSignUp}
                loading={loading}
                errorMessage={errorMessage}
                locations={locations}
                states={states}
                // onChangeRegion={onChangeRegion}
            />
            <ToastContainer />
        </div>
    );
};

export default SignUpPage;
