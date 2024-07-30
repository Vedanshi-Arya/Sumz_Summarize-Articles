import React from 'react'
import { useState,useEffect } from 'react'
import { useLazyGetSummaryQuery } from '../services/article'
import {copy, linkIcon , loader , tick}from '../assets'

const Demo = () => {
    const [article,setArticle]=useState({
        url:"",
        summary:"",
    })

    const [allArticles , setAllArticles] = useState([])

    const [getSummary , {error, isFetching}] = useLazyGetSummaryQuery()

    const [copied, setCopied] = useState("");

    useEffect(()=>{
      const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

      if(articlesFromLocalStorage){
        setAllArticles(articlesFromLocalStorage)
      }
    }, []);


    const handleCopy = (copyUrl) => {
      setCopied(copyUrl);
      navigator.clipboard.writeText(copyUrl);
      setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };


    const handleSubmit = async (e)=>{
      e.preventDefault();
        const {data} = await getSummary({ articleUrl : article.url});

        if(data?.summary){
          const newArticle = {...article, summary: data.summary} 

          const updatedAllArticles = [newArticle, ...allArticles]

          setArticle(newArticle)
          setAllArticles(updatedAllArticles)


          localStorage.setItem('articles', JSON.stringify( updatedAllArticles))
        }
    }



  return (
    <section className='mt-16 w-full max-w-xl'>

    <div className='flex flex-col w-full gap-2'>
      <form
        className='relative flex justify-center items-center'
        onSubmit={handleSubmit}
        
      >
        <img
          src={linkIcon}
          alt='link-icon'
          className='absolute top-11 left-0 my-2 ml-3 w-5'
        />

        <input
          type='url'
          placeholder='Paste the article link'
          value={article.url}
          onChange={(e) => setArticle({ ...article, url: e.target.value })}

// .It creates a copy of article object . the spread operator is used so that all the properties of the article object remain unchanged while updating only the url

          onKeyDown={handleKeyDown}
          required
          className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
        />
        <button
          type='submit'
          className='submit_btn  peer-focus:border-gray-700 peer-focus:text-gray-700 h-10 '
        >
          <p>↵</p>
        </button>
      </form>

      {/* History */}

      <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {allArticles.map((item,index)=>(
          <div key={`link-${index}`} onClick={()=> setArticle(item)} className='link_card'>

            <div className='copy_btn' onClick={()=> handleCopy(item.url)}>
              <img src={copied === item.url ? tick : copy}
               alt="copy_icon" className='w-[40%] h-[40%] object-contain'/>
            </div>
            <p className='flex-1 text-blue-700 font-medium text-sm truncate'>
              {item.url}
            </p>
          </div>
        ))}
        </div>
  </div>

{/* Result */}
        <div className='my-10 max-w-full flex justify-center items-center'>
          {isFetching ? (
            <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>
          ): error ? (
            <p className='font-inter font-bold text-black text-center'>
              Well, that wasn't supposed to happen..
              <br></br>
              <span className='font-normal'>
                {error?.data?.error}
              </span>
            </p>
          ): (
            article.summary && (<div className='flex flex-col gap-3'>
              <h2 className='font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>
                  Summary
                </span>
              </h2>
              <div className='summary_box'>
                <p className='font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>)
          )}

        </div>

      
</section>
    
  )
}

export default Demo

// when we need to style an element based on the state of some parent, mark the parent with the 'group'
// when we need to style an element based on the state of a sibling element, mark the sibling with the peer