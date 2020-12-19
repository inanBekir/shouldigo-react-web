import {
    getAllExperiences,
    getAllYourExperiences,
    loading,
    getProfile,
    getComments,
    getMostPopularExperiences,
    getMostLikedExperiences,
    getMostCommentedExperiences,
    getNotifications,
    getExperience,
  } from '../../redux/reducer';
import { db } from '../../../firebase/firebase.utils'

const profileCollection = db.collection('Profiles');
const commentCollection = db.collection('Comments');
const experiencesCollection = db.collection('Experiences');
const experienceRatingsCollection = db.collection(
    'Experience_ratings',
);
const experienceLikesCollection = db.collection('Experience_likes');

  export function GetProfile(dispatch, userId) {
    profileCollection.doc(userId).onSnapshot((documentSnapshot) => {
      dispatch(getProfile(documentSnapshot.data()));
    });
  }

  export const AddComment = (
    comment,
    commentOwnerId,
    experienceOwnerImage,
    experienceId,
    commentOwnerName,
  ) => {
    commentCollection
      .add({
        comment_line: comment,
        comment_own_experience_id: experienceId,
        comment_own_image: experienceOwnerImage,
        comment_owner_id: commentOwnerId,
        comment_owner_name: commentOwnerName,
        comment_date: new Date(),
      })
      .then(function (docRef) {
      });
  };

  export const GetComments = (dispatch, page, experienceId) => {
    commentCollection
      .where('comment_own_experience_id', '==', experienceId)
      .orderBy('comment_date', 'desc')
      .limit(page)
      .get()
      .then((querySnapshot) => {
        const comments = [];
  
        querySnapshot.forEach((documentSnapshot) => {
          comments.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        dispatch(getComments(comments));
      });
  };

  export function GetExperience(dispatch, itemId) {
    experiencesCollection.doc(itemId).onSnapshot((documentSnapshot) => {
      dispatch(getExperience(documentSnapshot.data()));
    });
  }

  export function UpdateExperienceCommentedCount(key, count) {
    experiencesCollection
      .doc(key)
      .update({
        commentedCount: count + 1,
      })
      .then(() => {
        console.log('experience updated!');
      });
  }

  export const AddRating = (rating, experience, experienceId, userId) => {
    const lastRate = (rating + experience.rating) / 2;
    const lastRatedCount = experience.ratedCount + 1;
    experiencesCollection
      .doc(experienceId)
      .update({
        ratedCount: lastRatedCount,
        rating: lastRate,
      })
      .then(() => {
        console.log('Rate Added');
      });
    experienceRatingsCollection
      .add({
        experience_id: experienceId,
        user_id: userId,
        status: true,
      })
      .then(function (docRef) {
        console.log('Rate Added');
      });
  };

  export const AddLikeOrUnlike = (
    param,
    likeOrUnlikeCount,
    experienceId,
    userId,
  ) => {
      console.log('bek,r')
    const successMesTitle = 'Congratulations!';
    const successMesDescription = `You ${param} the experience`;
    experienceLikesCollection
      .add({
        experience_id: experienceId,
        user_id: userId,
        used: param,
      })
      .then(function (docRef) {
        if (param === 'liked') {
          experiencesCollection
            .doc(experienceId)
            .update({
              like: likeOrUnlikeCount,
            })
            .then(() => {
                window.location.reload(false)
            });
        } else {
          experiencesCollection
            .doc(experienceId)
            .update({
              unlike: likeOrUnlikeCount,
            })
            .then(() => {
                window.location.reload(false)
            });
        }
      });
  };