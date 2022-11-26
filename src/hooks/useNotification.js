import { useDispatch } from 'react-redux';

export const useNotification = () => {
  const dispatch = useDispatch();

  const add = ({ type = 'success', message }) => {
    dispatch({
      type: '@notifications/ADD',
      payload: { message, type },
    });
  };

  const remove = id => {
    dispatch({
      type: '@notifications/DELETE',
      payload: { id },
    });
  };

  return { add, remove };
};