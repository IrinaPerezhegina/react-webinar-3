import comment from "../../components/comment";

// Начальное состояние
export const initialState = {
    comments: [],
    count: 0,
    params: { // параметры запросов на сервер
      page: 1,
      limit: 10,
    },
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
          comments: [...action.payload.comments, { _id:action.payload._id, parent:{},_type: "article", fakeComment:true} ],
          waiting: false,
          count: action.payload.count,
        };
  
      case "comment/addCommentForm":
        return {
          ...state,
          comments: state.comments.map((comment) => {      
            if (comment.fakeComment=== true) {
              return { ...comment, parent: action.payload.parent, _id:action.payload._id, _type:"comment", fakeComment:true, name: action.payload.name };
            }
            return comment;
          }),
        };

      case "comment/onAddFormForArticle":
        return {
          ...state,
          comments: state.comments.map((comment) => {      
            if (comment.fakeComment === true) {
              return { ...comment, _id:action.payload, parent:{}, _type:"article", fakeComment:true };
            }
            return comment;
          }),
        };

      case "comment/changePage":
        return {
          ...state,
         params: {
          ...state.params,
          page:action.payload
         }
        };

      case "comment/reset":
        return {
         ...state,
         params: {
         ...state.params,
         page: 1 ,
         }
        };
    
     case "comment/create-start":     
      return { ...state, waiting: true };
  
    case "comment/create-success":
      return {
          ...state,
          comments: [...action.payload.comments,{ _id:action.payload.id, parent:{},_type: "article", fakeComment:true}],
          waiting: false,
          count: action.payload.count,
        };
  
    case "comment/create-error":
        return { ...state, waiting: false }; // Текст ошибки необходимо хранить в сторе, если есть ошибка то отрисовывать пользователю  интерфейс с описанием ошибки
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  