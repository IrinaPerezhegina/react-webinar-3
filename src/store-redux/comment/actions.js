export default {

    // Загрузка комментариев по id товара
    load: (id) => {
      return async (dispatch, getState, services) => {
        const skip= (getState().comment.params.page - 1) * getState().comment.params.limit
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({ type: "comment/load-start" });

        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=${getState().comment.params.limit}&skip=${skip}*&search[parent]=${id}`,
          });
  
          // Комментарии загружены успешно
          dispatch({
            type: "comment/load-success",
            payload: {
              comments: res.data.result.items,
              count: res.data.result.count,
              _id: id
            },
          });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: "comment/load-error" });
        }
      };
    },

  // Добавление формы для ответа на какой-либо комментарий
    onAddCommentForm: (data) => {
      return { type: "comment/addCommentForm", payload: data };
    },

  // Добавление формы для комментария товара на странице
    onAddFormForArticle: (id) => {
      return ({ type: "comment/onAddFormForArticle", payload: id  });
    },

  // Перелистывание страницы комметнтариев
    onTurnPage: (num) => {
      return ({ type: "comment/changePage", payload: num  });
    },

    // Сбрасывание страниц на первую
    resetParams: () => {
      return ({ type: "comment/reset" });
    },
  
    // Создание комментария
    createComment: (data) => {
      return  (dispatch, getState, services) => {
        const skip= (getState().comment.params.page - 1) * getState().comment.params.limit
        //  ожидания отправки
        dispatch({ type: "comment/create-start" });
        try {
           services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${data.id}`,
            method: "POST",
            body: JSON.stringify({
              parent: data.data.parent,
              text: data.data.text,
            }),
          })
          .then(async()=>{
             const res =await services.api.request({
               url:`/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=${getState().comment.params.limit}&skip=${skip}*&search[parent]=${data.id}`,
            })
            return ({res,data})
          })
          .then(({data,res})=>{
            dispatch({
              type: "comment/create-success",
              payload: {
                id:data.id,
                comments:res.data.result.items,
                count:res.data.result.count
              }
            });
          })
          .catch((e)=>console.err(e));
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: "comment/create-error" });
        }
      };
    },
  };
  