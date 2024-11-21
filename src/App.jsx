import { useState ,useEffect} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import{fetchDataFromApi} from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigure ,getGenres} from './store/homeSlice'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import Error from './pages/404/Error'
function App() {
  const dispatch = useDispatch()
  
  const {url} = useSelector((state) => state.home)


  
console.log(url);
useEffect(()=>{
fetchDat();
genresCall();
},[]);
const fetchDat=()=>{
fetchDataFromApi("/configuration").then((res)=>{
  console.log(res)
  const url={
    backdrop:res.images.secure_base_url+"original",
    poster:res.images.secure_base_url+"original",
    profile:res.images.secure_base_url+"original",
  }
  dispatch(getApiConfigure(url))
})
}
const genresCall=async()=>{
  let promises=[]
  let endpoints=["tv","movie"]
  let allGenres={};
   endpoints.forEach((url)=>{
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
   })
   const data=await Promise.all(promises)
 console.log(data)
 data.map(({genres})=>{
  return genres.map((item)=>(allGenres[item.id]=item))
 })
 dispatch(getGenres(allGenres));
}
  return (
   <Router>
    <Header />
    <Routes>
      <Route path='/'element={<Home />} />
      <Route path='/:mediaType/:id'element={<Details />} />
      <Route path='/search/:query'element={<SearchResult />} />
      <Route path='/explore/:mediaType'element={<Explore />} />
      <Route path='*'element={<Error />} />
    </Routes>
    <Footer />
   </Router>
  )
}

export default App
