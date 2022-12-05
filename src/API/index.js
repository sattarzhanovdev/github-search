import axios from "axios"

export const BASE_URL = 'https://api.github.com'

export const API = {
  getUsers: () => axios.get(`/users`),
  getUser: (username) => axios.get(`/users/${username}`),
  searchUsers: (username) => axios.get(`/search/users?q=${username}`),
  getMoreAboutUser: (username) => axios.get(`/users/${username}`),
  getRepos: (username) => axios.get(`/users/${username}/repos`),
  getFollowers: (username) => axios.get(`/users/${username}/followers`),
  getFollowings: (username) => axios.get(`/users/${username}/following`),
  getStaredRepos: (username) => axios.get(`/users/${username}/starred`),
}