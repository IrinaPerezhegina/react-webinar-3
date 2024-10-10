import { memo, useCallback,useMemo, useRef } from "react";
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
import Pagination from "../../components/pagination";
import getMargins from "../../utils/get-margins";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";

function CommentBox() {
  const store = useStore();
  const dispatch = useDispatch();
  const scollToRef = useRef(null);
  const { id } = useParams();
  const { t } = useTranslate()

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
    page: state.comment.params.page,
    limit: state.comment.params.limit,
    waiting:state.comment.waiting,
  }),
  shallowequal
);

const changedData = selectRedux.comments.map((item) => {
    if (item?.parent?._type === "article") {
      item.parent = {};
    }
    return item;
});

const callbacks = {
       // Создание комментария
    onSubmit: useCallback(
        (data) => {
          dispatch(
            commentActions.createComment({
              data,
              id: id,
            })
          );
          dispatch(commentActions.onAddFormForArticle(id))
        },
        [store]
      ),
    onAddFormForComment: useCallback(
     (data) => {
        dispatch(commentActions.onAddCommentForm(data))
        setTimeout(() => scollToRef?.current?.scrollIntoView( {behavior: "smooth" , block:"center"}), 50);
      },
      [store]
    ),
    onCancel: useCallback(() => dispatch(commentActions.onAddFormForArticle(id)), [store]),
    onPaginate: useCallback(page => dispatch(commentActions.onTurnPage(page)), [store]),
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
    [ selectRedux.comments]
  ),
};

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
      onAnswer={callbacks.onAddFormForComment} 
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
          {selectRedux.count > 10 &&<Pagination
          count={selectRedux.count}
          page={selectRedux.page}
          limit={selectRedux.limit}
          onChange={callbacks.onPaginate}
      />} 
      </Spinner>
      
       
  )
}

export default memo(CommentBox);