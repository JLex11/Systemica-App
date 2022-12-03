let notificationCount = 0

export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case '@notifications/ADD':
      action.payload.id = notificationCount++
      return [action.payload, ...state]
    case '@notifications/DELETE':
      return state.filter(notification => notification.id != action.payload.id)
    default:
      return state
  }
}
