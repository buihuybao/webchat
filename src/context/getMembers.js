
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getRoomMembers = functions.https.onCall((data, context) => {
  const roomId = data.roomId;
  const uidArr = [];

  // Lấy thông tin phòng chat từ bảng 'rooms'
  return admin.firestore().collection('rooms').doc(roomId).get()

    .then(roomDocSnapshot => {

      if (roomDocSnapshot.exists) {
        // Lấy danh sách các uid trong phòng chat từ mảng 'members'
        const members = roomDocSnapshot.data().members || [];

        // Lập danh sách uid
        members.forEach(member => uidArr.push(member.uid));

        // Lấy thông tin người dùng tương ứng với danh sách uid từ bảng 'users'
        return admin.firestore().collection('users').whereIn('uid', uidArr).get();
      }
      else {
        throw new functions.https.HttpsError('not-found', `Room ${roomId} not found`);
      }
    })

    .then(querySnapshot => {
      const users = [];
      querySnapshot.forEach(docSnapshot => users.push(docSnapshot.data()));
      return { members: users };
    })

    .catch(error => {
      throw new functions.https.HttpsError('unknown', error.message);
    });
});
