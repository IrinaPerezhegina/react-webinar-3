export default {

    // Загрузка комментариев по id товара
    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({ type: "comment/load-start" });

        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
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
  
    // Создание комментария
    createComment: (data) => {
      return  async(dispatch, getState, services) => {

        //  ожидания отправки
        dispatch({ type: "comment/create-start" });
        try {
          const res= await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${data.id}`,
            method: "POST",
            body: JSON.stringify({
              parent: data.data.parent,
              text: data.data.text,
            })
          })
            dispatch({
              type: "comment/create-success",
              payload: {
                _id: res.data.result._id,
                author: { profile: data.data.profile, _id: data.data.profile._id },
                dateCreate: new Date(Date.now()),
                text: data.data.text,
                parent: data.data.parent,
              },
            });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: "comment/create-error" });
        }
      };
    },
  };
  