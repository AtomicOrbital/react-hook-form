import React, { useCallback, useState } from 'react'
import { IGenderParams, ILocationParams, ISignUpParams, ISignUpValidation } from '../../../models/auth'
import { validSignUp, validateLogin, validateSignUp } from '../utils';
import { GENDER } from '../../intl/constants';
import { FormattedMessage } from 'react-intl';

import { useForm, Controller } from 'react-hook-form';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string,
  locations: Array<ILocationParams>;
  states: Array<ILocationParams>;
  onChangeRegion(idRegion: string): void;
}




const SignUpForm = (props: Props) => {
  const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props;
  const { control, handleSubmit, formState: { errors } } = useForm<ISignUpValidation>();


  const [formValues, setFormValues] = useState<ISignUpParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: ''
  });
  const [validate, setValidate] = useState<ISignUpValidation>();

  const onSubmit = React.useCallback(() => {
    const validate = validateSignUp(formValues);

    setValidate(validate);

    if (!validSignUp(validate)) {
      return;
    }

    onSignUp(formValues);
  }, [formValues, onSignUp]);

  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    GENDER.map((g: IGenderParams, index: number) => {
      arrGender.push(
        <option value={g.value} key={index}>
          {g.label}
        </option>,
      );
    })
    return arrGender;
  };

  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    locations.map((location: ILocationParams, index: number) => {
      arrRegion.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>
      )
    });
    return arrRegion;
  };

  const changeRegion = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeRegion(e.target.value);
    setFormValues({ ...formValues, region: e.target.value })
  };

  const renderState = () => {
    const arrState: JSX.Element[] = [
      <option disabled selected value={''} key={''} >
        {' '}
        -- select an option --{' '}
      </option>,
    ];

    states.map((state: ILocationParams, index: number) => {
      arrState.push(
        <option value={state.id} key={index}>
          {state.name}
        </option>,
      );
    });
    return arrState;
  };

  return (
    <form
      autoComplete="off"
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   onSubmit();
      // }}
      onSubmit={handleSubmit(onSubmit)}
      className='row g-3 needs-validation'
    >
      {!!errorMessage && (
        <div className='alert alert-danger' role='alert' style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <div>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <input className='form-control mb-2' type="email" placeholder="Email" value={value} onChange={onChange} />
            )}
          />
          {errors.email && <FormattedMessage id="Email is required" />}
        </div>

        {/* {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )} */}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <div>
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <input
                  type="password"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  value={value}
                  onChange={onChange}
                />
                {error && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="Password is required" />
                  </div>
                )}
              </>
            )}
          />

        </div>


        {/* {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )} */}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputRepeatPassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <div>
          <Controller
            control={control}
            name="repeatPassword"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <input
                  type="password"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  id="inputRepeatPassword"
                  value={value}
                  onChange={onChange}
                />
                {error && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="repeatPassword is required" />
                  </div>
                )}
              </>
            )}
          />

        </div>


        {/* {!!validate?.repeatPassword && (
          <small className="text-danger">
            <FormattedMessage id={validate?.repeatPassword} />
          </small>
        )} */}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="name" />
        </label>
        <div>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <input
                  type="text"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  id="gender"
                  value={value}
                  onChange={onChange}
                />
                {error && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="name is required" />
                  </div>
                )}
              </>
            )}
          />

        </div>


        {/* {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )} */}
      </div>

      <div className="col-md-12">
        <label htmlFor="selectGender" className="form-label">
          <FormattedMessage id="gender" />
        </label>
        <div>
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <select
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="selectGender"
                  value={value}
                  onChange={onChange}
                >
                  {renderGender()}
                </select>
                {error && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="gender is required" />
                  </div>
                )}
              </>
            )}
          />

        </div>


        {/* {!!validate?.gender && (
          <small className="text-danger">
            <FormattedMessage id={validate?.gender} />
          </small>
        )} */}
      </div>

      <div className="col-md-12">
        <label htmlFor="selectRegion" className="form-label">
          <FormattedMessage id="region" />
        </label>

        <div>
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <select
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="selectRegion"
                  value={value}
                  onChange={changeRegion()}>
                  {renderRegion()}
                </select>
                {error && (
                  <div className="invalid-feedback">
                    <FormattedMessage id="region is required" />
                  </div>
                )}
              </>
            )}
          />

        </div>

        {!!validate?.region && (
          <small className="text-danger">
            <FormattedMessage id={validate?.region} />
          </small>
        )}
      </div>

      {!!validate?.region && (
        <small className="text-danger">
          <FormattedMessage id={validate?.region} />
        </small>
      )}


      {formValues.region ? (
        <div className="col-md-12">
          <label htmlFor="selectState" className="form-label">
            <FormattedMessage id="state" />
          </label>
          <div>
            <Controller
              control={control}
              name="state"
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <select
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    id="selectState"
                    value={value}
                    onChange={onChange}
                  >
                    {renderState()}
                  </select>
                  {error && (
                    <div className="invalid-feedback">
                      <FormattedMessage id="state is required" />
                    </div>
                  )}
                </>
              )}
            />

          </div>


          {/* {!!validate?.state && (
            <small className="text-danger">
              <FormattedMessage id={validate?.state} />
            </small>
          )} */}
        </div>
      ) : null}

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>

    </form>
  )
}

export default SignUpForm;