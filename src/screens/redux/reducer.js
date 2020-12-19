import {
    GET_ALL_EXPERIENCES_SUCCESS,
    GET_ALL_YOUR_EXPERIENCES_SUCCESS,
    LOADING,
    GET_PROFILE_SUCCESS,
    GET_COMMENTS_SUCCESS,
    GET_MOST_POPULAR_EXPERIENCES_SUCCESS,
    GET_MOST_LIKED_EXPERIENCES_SUCCESS,
    GET_MOST_COMMENTED_EXPERIENCES_SUCCESS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_EXPERIENCE_SUCCESS,
  } from './types';
  
  export const getNotifications = (notifications) => ({
    type: GET_NOTIFICATIONS_SUCCESS,
  
    notificationsPayload: notifications,
  });
  
  export const getAllExperiences = (allExperiences, searchText) => ({
    type: GET_ALL_EXPERIENCES_SUCCESS,
  
    allExperiencesPayload: allExperiences,
    searchTextPayload: searchText,
  });
  
  export const getAllYourExperiences = (allYourExperiences) => ({
    type: GET_ALL_YOUR_EXPERIENCES_SUCCESS,
  
    allYourExperiencesPayload: allYourExperiences,
  });
  
  export const getMostPopularExperiences = (allMostPopularExperiences) => ({
    type: GET_MOST_POPULAR_EXPERIENCES_SUCCESS,
  
    allMostPopularExperiencesPayload: allMostPopularExperiences,
  });
  
  export const getMostLikedExperiences = (allMostLikedExperiences) => ({
    type: GET_MOST_LIKED_EXPERIENCES_SUCCESS,
  
    allMostLikedExperiencesPayload: allMostLikedExperiences,
  });
  
  export const getMostCommentedExperiences = (allMostCommentedExperiences) => ({
    type: GET_MOST_COMMENTED_EXPERIENCES_SUCCESS,
  
    allMostCommentedExperiencesPayload: allMostCommentedExperiences,
  });
  
  export const loading = (loaded) => ({
    type: LOADING,
  
    loadingPayload: loaded,
  });
  
  export const getProfile = (profile) => ({
    type: GET_PROFILE_SUCCESS,
  
    profilePayload: profile,
  });
  
  export const getComments = (comments) => ({
    type: GET_COMMENTS_SUCCESS,
  
    commentsPayload: comments,
  });
  
  export const getExperience = (experience) => ({
    type: GET_EXPERIENCE_SUCCESS,
  
    experiencePayload: experience,
  });
  
  const initialState = {
    allExperiences: [],
    searchText: '',
    loading: false,
    allYourExperiences: [],
    profile: [],
    comments: [],
    allMostPopularExperiences: [],
    allMostLikedExperiences: [],
    allMostCommentedExperiences: [],
    notifications: [],
    experience: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_EXPERIENCES_SUCCESS:
        return {
          ...state,
  
          allExperiences: action.allExperiencesPayload,
          searchText: action.searchTextPayload,
        };
  
      case GET_ALL_YOUR_EXPERIENCES_SUCCESS:
        return {
          ...state,
  
          allYourExperiences: action.allYourExperiencesPayload,
        };
  
      case GET_MOST_POPULAR_EXPERIENCES_SUCCESS:
        return {
          ...state,
  
          allMostPopularExperiences: action.allMostPopularExperiencesPayload,
        };
  
      case GET_MOST_LIKED_EXPERIENCES_SUCCESS:
        return {
          ...state,
  
          allMostLikedExperiences: action.allMostLikedExperiencesPayload,
        };
  
      case GET_MOST_COMMENTED_EXPERIENCES_SUCCESS:
        return {
          ...state,
  
          allMostCommentedExperiences: action.allMostCommentedExperiencesPayload,
        };
  
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
  
          profile: action.profilePayload,
        };
  
      case GET_COMMENTS_SUCCESS:
        return {
          ...state,
  
          comments: action.commentsPayload,
        };
  
      case GET_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
  
          notifications: action.notificationsPayload,
        };
  
      case GET_EXPERIENCE_SUCCESS:
        return {
          ...state,
  
          experience: action.experiencePayload,
        };
  
      case LOADING:
        return {
          ...state,
  
          loading: action.loadingPayload,
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  