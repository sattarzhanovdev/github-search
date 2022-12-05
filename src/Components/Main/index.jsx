import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiBookBookmark, BiBuildings, BiStar } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { SlLocationPin } from 'react-icons/sl'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { API } from '../../API'
import cls from './Main.module.scss'
import { langsList, typesList } from '../Utils'

const Main = ({username, setUsername}) => {
  const [ base, setBase ] = React.useState(null)
  const [ users, setUsers ] = React.useState(null)
  const [ repos, setRepos ] = React.useState(null)
  const [ stared, setStared ] = React.useState(null)
  const [ followers, setFollowers ] = React.useState(null)
  const [ followings, setFollowings ] = React.useState(null)
  const [ active, setActive ] = React.useState(1)
  const [ type, setType ] = React.useState('repos')
  const [ search, setSearch ] = React.useState('')

  React.useEffect(() => {
    API.searchUsers(username)
      .then(res => setBase(res.data.items[0]))

    API.getUser(username)
      .then(res => setUsers(res.data))

    API.getRepos(username)
      .then(res => setRepos(res.data))

    API.getStaredRepos(username)
      .then(res => setStared(res.data))

    API.getFollowers(username)
      .then(res => setFollowers(res.data))

    API.getFollowings(username)
      .then(res => setFollowings(res.data))
      
  }, [username])
    
  let searchedBase = repos?.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })

  const sortByTypes = (visibility) => {
    console.log(visibility);

    setRepos(repos?.filter(item => {
      if(item.visibility === visibility){
        return item
      }

      if(visibility === 'All'){
        return item
      }

      if(visibility === 'Private'){
        if(item.private === true){
          return item
        }else{
          return ''
        }
      }
    }))
  }


  const sortByLanguages = (language) => {
    console.log(language);
    setRepos(repos?.filter(item => {
      if(item.language === language){
        return item
      }
    }))
    console.log(repos);
  }


  return (
    <div className={cls.user}>
      <div className={cls.left}>
        <div className={cls.image_profile}>
          <img src={users?.avatar_url} alt="" />
        </div>
        <div className={cls.bio_profile}>
          <h2>{users?.name}</h2>
          <li>{users?.login}</li>
          <div className={cls.follow}>
            <li
              onClick={() => {
                setType('followers')
              }}
            >
              <span><FiUsers />  </span> {users?.followers} followers
            </li>
            <span className={cls.dot}>·</span>
            <li
              onClick={() => {
                setType('following')
              }}
            >
              {users?.following} following
            </li>
          </div>
          <li><span><BiBuildings /></span> {users?.company}</li>
          <li><span><SlLocationPin /></span> {users?.location}</li>
        </div>
      </div>
      <div className={cls.right}>
        <div className={cls.up}>
          <div className={cls.type}>
            <li 
              onClick={() => {
                setActive(1)
                setType('repos')
              }}
              className={active === 1 ? cls.active : ''}
            >
              <span><BiBookBookmark /></span> Repositories 
            </li>
            <li 
              onClick={() => {
                setActive(2)
                setType('stars')
              }}
              className={active === 2 ? cls.active : ''}
            >
              <span><BiStar /></span> Stars
            </li>
          </div>
          <div className={cls.searcher}>
            <input 
              type="text"
              placeholder='Find a repository...'
              onChange={e => setSearch(e.target.value)}
            />
            <div className={cls.sorting}>
              <div 
                className={cls.visibility}
                onClick={() => {
                  setActive(3)
                }}
              >
                <li>
                  Type <BsFillCaretDownFill />
                </li>
              </div>
              <div 
                className={cls.visibility}
                onClick={() => setActive(4)}
              >
                <li>
                  Language <BsFillCaretDownFill />
                </li>
              </div>
              <div 
                className={cls.visibility}
                onClick={() => setActive(5)}
              >
                <li>
                  Sort <BsFillCaretDownFill />
                </li>
              </div>

              {
                active === 3 ?
                <div 
                  className={cls.drop}
                  id={cls.type}
                >
                  <div className={cls.title}>
                    <h4>Select type</h4>
                    <li
                      onClick={() => setActive('')}
                    >
                      <AiOutlineClose />
                    </li>
                  </div>
                  {
                    typesList.map(item => (
                      <li
                        key={item.id}
                        onClick={() => {
                          sortByTypes(item.title)
                          setActive('')
                        }}
                      >
                        {item.title}
                      </li>
                    ))
                  }
                </div> : 
                active === 4 ?
                <div 
                  className={cls.drop}
                  id={cls.lang}
                >
                  <div className={cls.title}>
                    <h4>Select language</h4>
                    <li
                      onClick={() => setActive('')}
                    >
                      <AiOutlineClose />
                    </li>
                  </div>
                  {
                    langsList.map(item => (
                      <li
                        key={item.id}
                        onClick={() => {
                          sortByLanguages(item.title)
                          setActive('')
                        }}
                      >
                        {item.title}
                      </li>
                    ))
                  }
                </div> :
                active === 5 ?
                <div 
                  className={cls.drop}
                  id={cls.lang}
                >
                  <div className={cls.title}>
                    <h4>Select order</h4>
                    <li
                      onClick={() => setActive('')}
                    >
                      <AiOutlineClose />
                    </li>
                  </div>
                  {
                    langsList.map(item => (
                      <li
                        key={item.id}
                        onClick={() => {
                          sortByLanguages(item.language)
                          setActive('')
                        }}
                      >
                        {item.title}
                      </li>
                    ))
                  }
                </div> :
                null
              }
            </div>
          </div>
        </div>
        {
          type === 'followers' ?
          <div className={cls.down}>
            {
              followers?.map((item, i) => (
                <div 
                  key={i}
                  className={cls.follower}
                  onClick={() => setUsername(item.login)}
                >
                  <div className={cls.img_profile}>
                    <img 
                      src={item.avatar_url} 
                      alt="image profile"
                    />
                  </div>
                  <h3>{item.login} <span>{item.name}</span></h3>
                </div>
              ))
            }
          </div> :
          type === 'following' ?
          <div className={cls.down}>
            {
              followings?.map((item, i) => (
                <div 
                  key={i}
                  className={cls.follower}
                  onClick={() => setUsername(item.login)}
                >
                  <div className={cls.img_profile}>
                    <img 
                      src={item.avatar_url} 
                      alt="image profile"
                    />
                  </div>
                  <h3>{item.login} <span>{item.name}</span></h3>
                </div>
              ))
            }
          </div> :
          <div className={cls.down}>
            {
              type === 'repos' ? repos?.map((item, i) => (
                <div 
                  key={i}
                  className={cls.repos} 
                >
                  <div className={cls.left}>
                    <div className={cls.title}>
                      <h3
                        onClick={() => {
                          window.open(item.html_url, '_self')
                        }}
                      >
                        {item.name}
                      </h3>
                      <span>{item.visibility}</span>
                    </div>
                    <div className={cls.lang}>
                      <div
                        className={
                          item.language === 'JavaScript' ? 
                          cls.js : 
                          item.language === 'TypeScript' ?
                          cls.ts :
                          item.language === 'Python' ?
                          cls.python:
                          item.language === 'CSS' ?
                          cls.css :
                          item.language === 'SCSS' ?
                          cls.scss :
                          item.language === 'HTML' ? 
                          cls.html :
                          item.language === 'C++' ?
                          cls.cp :
                          ''
                        }
                      >
                        
                      </div>
                      <p>{item.language}</p>
                      <p>Updated at {item.updated_at.slice(0, 10)}</p>
                    </div>
                  </div>
                </div>
              )) :
              type === 'stars' ? stared?.map((item, i) => (
                <div 
                  key={i}
                  className={cls.repos} 
                >
                  <div className={cls.left}>
                    <div className={cls.title}>
                      <h3 
                        onClick={() => {
                          window.open(item.html_url, '_self')
                        }}
                      >
                        {item.name} 
                      </h3>
                      <span>{item.visibility}</span>
                    </div>
                    <div className={cls.lang}>
                      <div
                        className={
                          item.language === 'JavaScript' ? 
                          cls.js : 
                          item.language === 'TypeScript' ?
                          cls.ts :
                          item.language === 'Python' ?
                          cls.python:
                          item.language === 'CSS' ?
                          cls.css :
                          item.language === 'SCSS' ?
                          cls.scss :
                          item.language === 'HTML' ? 
                          cls.html :
                          item.language === 'C++' ?
                          cls.cp :
                          ''
                        }
                      >
                        
                      </div>
                      <p>{item.language}</p>
                      <p>Updated at {item.updated_at.slice(0, 10)}</p>
                    </div>
                  </div>
                </div>
              )) :
              repos?.map((item, i) => (
                <div 
                  key={i}
                  className={cls.repos} 
                >
                  <div className={cls.left}>
                    <div className={cls.title}>
                      <h3 
                        onClick={() => {
                          window.open(item.html_url, '_self')
                        }}
                      >
                        {item.name} 
                      </h3>
                      <span>{item.visibility}</span>
                    </div>
                    <div className={cls.lang}>
                      <div
                        className={
                          item.language === 'JavaScript' ? 
                          cls.js : 
                          item.language === 'TypeScript' ?
                          cls.ts :
                          item.language === 'Python' ?
                          cls.python:
                          item.language === 'CSS' ?
                          cls.css :
                          item.language === 'SCSS' ?
                          cls.scss :
                          item.language === 'HTML' ? 
                          cls.html :
                          item.language === 'C++' ?
                          cls.cp :
                          ''
                        }
                      >
                        
                      </div>
                      <p>{item.language}</p>
                      <p>Updated at {item.updated_at.slice(0, 10)}</p>
                    </div>
                  </div>
                </div>
              )) 
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Main