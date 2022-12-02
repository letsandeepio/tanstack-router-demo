import { useMatch } from '@tanstack/react-router';
import { characterRoute } from './App';
import { Spinner } from './Spinner';

export function Character() {
  const {
    loaderData: { character },
    params: { characterId },
  } = useMatch(characterRoute.id);

  return (
    <div>
      <h4>{character.name}</h4>
      <p>Species: {character.species}</p>
      <img src={`${character.image}`}/>
    </div>
  );
}
