window.WAPI.onAnyMessage = function (callback) {
  window.Store.Msg.on('add', function (newMessage) {
    if (newMessage && newMessage.isNewMsg) {
      if (
        !newMessage.clientUrl &&
        (newMessage.mediaKeyTimestamp || newMessage.filehash)
      ) {
        const cb = (msg) => {
          if (
            msg.id._serialized === newMessage.id._serialized &&
            msg.clientUrl
          ) {
            callback(WAPI.processMessageObj(msg, true, false))
            Store.Msg.off('change:isUnsentMedia', cb)
          }
        }
        Store.Msg.on('change:isUnsentMedia', cb)
      } else {
        let pm = window.WAPI.processMessageObj(newMessage, true, true)
        let message = pm
          ? JSON.parse(JSON.stringify(pm))
          : WAPI.quickClean(newMessage.attributes)
        if (message) {
          callback(message)
        }
      }
    }
  })
}

window.WAPI.quickClean = function (ob) {
  var r = JSON.parse(JSON.stringify(ob))
  if (r.mediaData && Object.keys(r.mediaData).length == 0) delete r.mediaData
  if (r.chat && Object.keys(r.chat).length == 0) delete r.chat
  Object.keys(r)
    .filter((k) => r[k] == '' || r[k] == [] || r[k] == {} || r[k] == null)
    .forEach((k) => delete r[k])
  Object.keys(r)
    .filter((k) => (r[k] ? r[k]._serialized : false))
    .forEach((k) => (r[k] = r[k]._serialized))
  Object.keys(r)
    .filter((k) => (r[k] ? r[k].id : false))
    .forEach((k) => (r[k] = r[k].id))
  return r
}
