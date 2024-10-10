// Начальное состояние
export const initialState = {
  data: {},
  comments: [],
  count: 0,
  params: {
    page: 1,
    limit: 10,
  },
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return { ...state, data: {}, waiting: true };

    case "article/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "article/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
