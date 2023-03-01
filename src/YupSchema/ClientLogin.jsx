import * as yup from 'yup'

const regex = /^\s*\S.*$/;

export const userLogin = yup.object().shape({
    email: yup.string().matches(regex, 'Email is not valid').email('Invalid Email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password should only contain 20 characters').required('Password is required'),
}) 