import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext=  React.createContext();

const GithubProvider = ({children}) => {
  const [githubUser , setGithubUser] = useState(mockUser);
  const [repos , setRepos] = useState(mockRepos);
  const [followers , setFollowers] = useState(mockFollowers);

  const[requests,setRequest] = useState(0);
  const[loading,setLoading] = useState(false);
  //error;
  const[error,setError] = useState({show:false,msg:""})

 // sreach github user data using API ***********
 const searchGithubUser = async(user)=>{
   checkError();
   setLoading(true);
  const response = await axios(`${rootUrl}/users/${user}`).catch((err)=>console.log(err));
  if(response){
    setGithubUser(response.data);
    // setting up followers in user data we have followes_url from that we get all of our Followers
    const{login,followers_url,repos_url} = response.data;

    const followerdata =await axios(`${followers_url}?per_page=100`); // feching followers data
    setFollowers(followerdata.data);

    // setting up repos data
    const reposdata = await axios(`${repos_url}?per_page=100`); // feching repos data
    setRepos(reposdata.data);
  }
  else
  {
    checkError(true,'there is no user of that username');
  }
  CheckRequest();
  setLoading(false);
};
// ******** end github user data serach


  // using axios for cheking rate limit of request of user
  // then is callback function in which we are looking back for data that we get by making request
  const CheckRequest =()=>{
    axios(`${rootUrl}/rate_limit`).then(({data})=>{
      let {
        rate:{remaining} } = data;

      setRequest(remaining);
      if(remaining===0){
        // show an error to user.
        checkError(true,"Sorry,you have exeeded your hourly rate limit!");
      }
    }).catch((err)=>{
      console.log(err);
    });
  };
  // error function
  function checkError(show=false,msg=''){
    setError({show,msg});
  }

  //useEffect
  useEffect(CheckRequest,[]);
// ******** end of getting rate limit
  return(<GithubContext.Provider value={{githubUser,repos,followers,requests,error,searchGithubUser,loading}}> {children}

      </GithubContext.Provider>

  );

};

export{GithubProvider , GithubContext  };
