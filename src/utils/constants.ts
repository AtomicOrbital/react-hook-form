export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : '/api';

// export const APIHost = development ? '/api/v1/location'

export const ACCESS_TOKEN_KEY = 'token';
