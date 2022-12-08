import Blogs from './Components/Blogs';
import Navbar from './Components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import PostArticle from './Components/PostArticle';
import BlogSinglePage from './Components/BlogSinglePage';


function App() {
  return (
    <div >
      <ToastContainer/> 
       <BrowserRouter>
       <Navbar/>
         <Routes>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/postarticle' element={<PostArticle/>}/>
          <Route path='/blogsinglepage' element={<BlogSinglePage/>}/>
         </Routes>
         
       </BrowserRouter>
    </div>
  );
}

export default App;

