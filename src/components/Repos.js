import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = React.useContext(GithubContext);

   const languages = repos.reduce((total,item)=>{
     const {language, stargazers_count} = item;
     if(!language) return total;
     if(!total[language]){
       total[language] = {label:language,value:1,star:stargazers_count};
     }else{
       total[language] = {...total[language],value:total[language].value+1,
         star:total[language].star+stargazers_count}
     }
   return total;
   },{});
   // change obejcts to array of objects and sorting them in decreasing order and slice it upto top 5 language
   // for pie3d chart
const  mostUsed = Object.values(languages).sort((a,b)=>{
     return b.value - a.value ;
   }).slice(0,5);

// star per language or most popular language for doughtnut2d chart
const starperLanguage = Object.values(languages).sort((a,b)=>{
  return b.star - a.star;
}).map((item)=>{
  return {...item,value:item.star};
}).slice(0,5);

// repos with maximum stars for column3d data
let {stars,forks} = repos.reduce((total,item)=>{
  const {stargazers_count,name,forks} = item;
  total.stars[stargazers_count] = {label:name,value:stargazers_count}
  total.forks[forks] = {label:name,value:forks}
  return total;
},{stars:{},forks:{}
})


// stars
const stardata = Object.values(stars).slice(-5).reverse();
// forks
const forksdata = Object.values(forks).slice(-5).reverse();


  return(
  <section className='section'>
    <Wrapper className='section-center'>
     <Pie3D data={mostUsed} />
     <Column3D data={stardata} />
    <Doughnut2D data={starperLanguage} />
    <Bar3D data={forksdata} />
    </Wrapper>
  </section>
);
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
