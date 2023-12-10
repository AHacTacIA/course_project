import React from "react";
import {useParams} from "react-router-dom";

import { Recipe } from "../components/Recipe";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullRecipe = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    const {id} = useParams();

    React.useEffect(() =>{
        axios.get(`/recipes/${id}`).then(res=>{
            setData(res.data);
            setLoading(false);
        }).catch(err=>{
            console.warn(err);
            alert('Error when receiving the recipe');
        });
    },[]);

    if (isLoading){
        return <Recipe isLoading={isLoading} isFullPost/>;
    }


  return (
    <>
      <Recipe
          _id={data._id}
          title={data.title}
          imageUrl={data.imageUrl}
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={3}
          tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Recipe>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
