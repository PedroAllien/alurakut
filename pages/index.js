import React from 'react';
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar( propriedades ){
  return (
      <Box as="aside">
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />  
        <hr/>
         
        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} >
            @{propriedades.githubUser}  
          </a> 
        </p>  
        <hr/>

        <AlurakutProfileSidebarMenuDefault/>
      </Box>
  );
}

function ProfileRelationBox(propriedades){
  return (
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            {propriedades.title} ({propriedades.items.length})
        </h2>
        <ul>
          {/*seguidores.map((itemAtual)=> {
            return (
              <li key={itemAtual} >
                <a href={`https://github.com/${itemAtual}.png`} >
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
              </li>
          )
          })*/}
        </ul>
      </ProfileRelationsBoxWrapper>
  )

}

export default function Home() {
  const githubUser = 'PedroAllien';
  const [comunidades, setComunidades] = React.useState([{

  }]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini', 
    'jvictor23',
    'felipefialho'
  ];
  const [seguidores, setSeguidores] = React.useState([]);
  // 0- Pegar o array de dados do github
  React.useEffect(function(){
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      setSeguidores(respostaCompleta)
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '014222f6e50b8fe58c7f47a8d4af35',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }
        `
      })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta;
      setComunidades(comunidadesDato);
      
    })

  }, [])
  //1- Criar um box com map, baseado nositems do array que pegamos no servidor do github

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
              <h1 className="title">
                  Bem Vindo(a)
              </h1>

              <OrkutNostalgicIconSet>

              </OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2>O que você deseja fazer?</h2>
            <form onSubmit={ function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              };

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
              
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title" 
                  area-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque a URL de capa"
                  name="image" 
                  area-label="Coloque a URL de capa" 
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                Comunidades (comunidades.length)
            </h2>
            <ul>
              {comunidades.map((itemAtual)=> {
                return (
                  <li key={itemAtual.id} >
                    <a href={`communities/${itemAtual.id}`} >
                    <img src={} />
                    <span>{itemAtual.title}</span>
                  </a>
                  </li>
              )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas Da Comunidade ({pessoasFavoritas.length})
              </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual)=> {
                return (
                  <li key={itemAtual} >
                    <a href={`users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                  </li>
              )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
    )
}
