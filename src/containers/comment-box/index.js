import { memo, useCallback,useEffect,useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import { useDispatch } from "react-redux";
import shallowequal from "shallowequal";
import dateСonverter from "../../utils/date-converter";
import commentActions from "../../store-redux/comment/actions";
import CommentsList from "../../components/comments-list";
import { useSelector as useSelectorRedux } from "react-redux";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";
import getMargins from "../../utils/get-margins";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";

function CommentBox() {
  const store = useStore();
  const dispatch = useDispatch();
  const scollToRef = useRef(null);
  const { id } = useParams();
  const { t } = useTranslate()
  const [comments, setComments]=useState([])

  const select = useSelector(
    (state) => ({
      user: state.session.user,
      exists: state.session.exists,
    }),
    shallowequal
  );

const selectRedux = useSelectorRedux(
  (state) => ({
    comments: state.comment.comments,
    data: state.article.data,
    count: state.comment.count,
    waiting:state.comment.waiting,
  }),
  shallowequal
);

const changedData = comments.map((item) => {
    if (item?.parent?._type === "article") {
      item.parent = {};
    }
    return item;
});


 // Создание ответа на комментарий
const onAddFormForComment = (data) => {
  setComments(prev => 
    prev.map(obj =>
      obj._id === selectRedux.data._id || obj._id === "100" ? ({
        ...data,
        fakeComment:true
     }) : obj)
  )
  setTimeout(() => scollToRef?.current?.scrollIntoView( {behavior: "smooth" , block:"center"}), 50);
}

const callbacks = {
       // Создание комментария
    onSubmit: useCallback(
        (data) => {
          dispatch(
            commentActions.createComment({data,id:id})
          );
          callbacks.onCancel()
        },
        [store]
      ),
      // Отмена создания ответа на комментарий
     onCancel: useCallback(() => {
        if (selectRedux.data) {
          setComments(prev => 
            prev.map(obj =>
              obj._id === "100" ? ({
                 _id: selectRedux.data._id ||"100", 
                 parent:{}, _type: "article", 
                 fakeComment:true
             }) : obj)
          )
        }
      },[comments, onAddFormForComment]),

  };

 // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
 const options = {
  // Дерево комментариев
  comments: useMemo(
    () =>
      treeToList(listToTree(changedData), (item, level) => ({
        ...item,
        parentId: item.parent?._id || null,
        count: level,
        _id: item._id,
        text: item.text,
      })),
    [ comments]
  ),
};

useEffect(()=>{
  if(selectRedux.comments &&selectRedux.data._id)
  setComments([...selectRedux.comments,{ _id:selectRedux.data._id, parent:{}, _type: "article", fakeComment:true} ])
},[selectRedux.waiting])


const renders = {
  comment: useCallback(comment => (
    <Comment 
      t={t}
       margin={getMargins(comment.count)}
      auth={comment?.author?._id === select.user._id}
      ref={scollToRef}
      data={dateСonverter(comment.dateCreate)} 
      exist={select.exists} 
      isComment={comment.fakeComment === true ? false : true} 
      onAnswer={onAddFormForComment} 
      onCancel={callbacks.onCancel}
      comment={comment} 
      onSubmit={callbacks.onSubmit}
      user={select.user}/>
  ), [selectRedux.comments, select.exists]),
};

return (
       <Spinner active={selectRedux.waiting}>
          <CommentsList
          t={t}
          renderItem={renders.comment}
          list={options.comments}
          count={selectRedux.count} 
        />
      </Spinner>
      
       
  )
}

export default memo(CommentBox);