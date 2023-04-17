import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';

import logo from '../../../logo-420-x-108.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPageV2() {

    const notifyAccess = () => toast("Đăng nhập thành công !");
    const notifyFailed = () => toast("Đăng nhập thất bại !");

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = useCallback(async (data: Record<string, any>) => {
        const json = await dispatch(fetchThunk(API_PATHS.signIn, 'post', { email: data.email, password: data.password }));

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            dispatch(setUserInfo(json.data));
            Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: data.rememberMe ? 7 : undefined });
            dispatch(replace(ROUTES.home));
            // Show successful login message on toast
            // alert('Login successful!');
            notifyAccess();
        } else {
            // alert(getErrorMessageResponse(json));
            notifyFailed();
        }
    }, [dispatch]);

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
            <img src={logo} alt="logo" style={{ maxWidth: '250px', margin: '32px' }} />
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='col-md-12'>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <input className='form-control mb-2' type="email" placeholder="Email" value={value} onChange={onChange} />
                        )}
                    />
                    {errors.email && <span>Email is required</span>}
                </div>
                <div>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <input className='form-control mb-2' type="password" placeholder="Password" value={value} onChange={onChange} />
                        )}
                    />
                    {errors.password && <span>Password is required</span>}
                </div>
                <div>
                    <label>
                        <Controller
                            control={control}
                            name="rememberMe"
                            defaultValue={false}
                            render={({ field: { onChange, value } }) => (
                                <input className="form-check-input" type="checkbox" checked={value} onChange={onChange} />
                            )}
                        />
                        Remember me
                    </label>
                </div>
                <button className='btn btn-primary'type="submit">Submit</button>
                <ToastContainer />
            </form>
        </div>
    );
}
