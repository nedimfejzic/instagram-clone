import usePhotos from "../hooks/use-photos";
import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  if (result.size === 0) {
    return false;
  }

  return true;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  // dobijamo collection, koji ima vise documents
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  console.log("user by useranme", user);
  return user;
}

export async function getUserObjectByUserId(uid) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", uid)
    .get();

  // dobijamo collection, koji ima vise documents
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(5).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateFollowingForUser(
  userId,
  followingId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(followingId)
        : FieldValue.arrayUnion(followingId),
    });
}
export async function addFollowerForUser(userId, followerId, isFollower) {
  console.log("userId", userId);
  console.log("followerId", followerId);
  return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({
      followers: isFollower
        ? FieldValue.arrayRemove(followerId)
        : FieldValue.arrayUnion(followerId),
    });
}

export async function getPostsOfUsers(userid, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  if (result.empty === true) {
    return null;
  }
  const posts = result.docs.map((objava) => ({
    ...objava.data(),
    docId: objava.id,
  }));

  const postsWithDetails = await Promise.all(
    posts.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userid)) {
        userLikedPhoto = true;
      }
      const postPublishedBy = await getUserObjectByUserId(photo.userId);

      const { username } = postPublishedBy[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return postsWithDetails;
}

export async function likeUnlikePost(userid, postid, pressedLike) {
  return firebase
    .firestore()
    .collection("photos")
    .doc(postid)
    .update({
      likes: pressedLike
        ? FieldValue.arrayUnion(userid)
        : FieldValue.arrayRemove(userid),
    });
}

export async function addComment(postDocId, displayName, comment) {
  return firebase
    .firestore()
    .collection("photos")
    .doc(postDocId)
    .update({
      comments: FieldValue.arrayUnion({ displayName, comment }),
    });
}

export async function getPostsOfUserByUserID(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const posts = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return posts;
}
