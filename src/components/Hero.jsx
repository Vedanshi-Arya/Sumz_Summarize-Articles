import {logo} from '../assets'

const Hero = () => {
  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <div className='mt-5  nav flex w-full justify-between items-center flex-row'>
            <img src={logo} alt="sumz_logo" className='w-28 object-contain'/>
            <button type="button" onClick={()=>window.open(`https://github.com/vedanshi-arya`)} className='black_btn'>Github</button>
        </div>

        <div className='mt-10 flex flex-col items-center justify-center'>
            <h1 className='head_text'>Summarize Articles with <br className='max-md:hidden'/><span className='orange_gradient'>OpenAI GPT-4</span></h1>
            <p className='desc'>Simplify your reading with Sumz, an open-source article summarizer that transforms lengthy articles into clear and concise summaries</p>
        </div>        
    </div>
  )
}

export default Hero