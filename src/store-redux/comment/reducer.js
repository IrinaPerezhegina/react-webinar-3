import comment from "../../components/comment";

// Начальное состояние
export const initialState = {
    comments: [],
    count: 0,
    waiting: false, // признак ожидания загрузки
  };
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
       case "comment/load-start":
        return { ...state, comments: [], waiting: true };
 

      case "comment/load-success":
        return {
          ...state,
          comments: action.payload.comments,
          waiting: false,
          count: action.payload.count,
        };
  

     case "comment/create-start":     
      return { ...state, waiting: true };
  
    case "comment/create-success": 
      return {
          ...state,
          comments: [...state.comments,{...action.payload}],
          waiting: false,
          count:state.count + 1
        };
  
    case "comment/create-error":
        return { ...state, waiting: false }; // Текст ошибки необходимо хранить в сторе, если есть ошибка то отрисовывать пользователю  интерфейс с описанием ошибки
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  