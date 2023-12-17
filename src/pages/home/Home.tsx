
import Relevance from '../../components/relevance/Relevance'

import TopBox from '../../components/topBox/TopBox'

import "./home.scss"
const Home = () => {
  return (
    // home class for the charts 
    <div className='home'>
      {/* topbox containing dummy names */}
      <div className="box box1"><TopBox/></div>
      {/* Year graph with year filter */}

      {/* relevance graph */}
      <div className="box box3"><Relevance/></div>
      {/* sector graph  */}

      {/* countries graph  */}

      

    </div>
  )
}

export default Home     