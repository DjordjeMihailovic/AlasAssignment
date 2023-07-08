const ProvidedHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer 3b21c8c06eccd9575f87b9d00aad3e4a2bf93448b9bdb6050598cce09b214a1a', // Token provided from account created at https://gorest.co.in/
}

const newUserData = {
  name: 'Bob',
  gender: 'male',
  email: 'BobTest123@gmail.com',
  status: 'active',
}

const UpdateUserData = {
  name: 'Bobina',
  gender: 'female',
  email: 'BobTest123@gmail.com',
  status: 'inactive',
}

const Endpoints = {
  users: 'https://gorest.co.in/public/v2/users/'
}

module.exports = {
  ProvidedHeaders,
  newUserData,
  UpdateUserData,
  Endpoints
}