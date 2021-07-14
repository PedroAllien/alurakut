import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar( propriedades ){
  return (
      <Box>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />   
      </Box>
  );
}

export default function Home() {
  const githubUser = 'PedroAllien';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini', 
    'jvictor23',
    'felipefialho'
  ];

  return (
    <>
      <AlurakutMenu/>
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
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas Da Comunidade ({pessoasFavoritas.length})
              </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual)=> {
                return (
                  <li>
                    <a href={`users/${itemAtual}`} key={itemAtual} >
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