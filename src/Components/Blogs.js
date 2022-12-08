import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
import config from '../config';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';

export default function Blogs() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [ userBlogs,setUserBlogs] = useState([]);
    const[imagePath,setImagePath] = useState('');

    async function getArticles() {
        const res = await axios.get(config.newsapiURL);
        setArticles(res.data.articles);
    }
    async function getUserBlogs() {
        const res = await axios.get(config.userBlogsURL);
        setUserBlogs(res.data.blogs);
    }
    useEffect(() => {
        getArticles();
        getUserBlogs();
    }, []);

    const toComponentB=(item)=>{
        navigate('/blogsinglepage',{state:{details:item}});
          }

    return (
        <div className='container'>
          {
          articles!=null&&articles.map(item=>
            <div style={{cursor:'pointer'}} onClick={()=>{toComponentB(item)}} className="card mt-4" key={item?.title} >
                <img  className="card-img" src={item.urlToImage} alt="article related pic" />
                <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                    <p className="card-text">{item?.description}</p>
                </div>
            </div>
            )
          }
          <div className='mt-3 text-center' style={{backgroundColor:'black',color:'white'}}>
            <h2><b className='mb-2'>Our User's Blog</b></h2>
          </div>
          <br />

          {
          userBlogs!=null&&userBlogs.map(item=>
            <div style={{cursor:'pointer'}} onClick={()=>{toComponentB(item)}} className="card mt-4" key={item?._id} >
                <img src={item.urlToImage} className="card-img"  alt="article related pic" />
                <div className="card-body">
                    <h5 className="card-title">{item?.title}</h5>
                    <p className="card-text">{item?.description}</p>
                </div>
            </div>
            )
          }

          


        </div>
    )
}
