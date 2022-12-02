import { Outlet, useMatch } from '@tanstack/react-router';
import { characterRoute, charactersRoute } from '../../components/App';
import { Spinner } from '../../components/Spinner';


export function Characters() {
  const {
    loaderData: { characters },
    Link,
  } = useMatch(charactersRoute.id);

  return (
    <div>
      <div
        style={{
          float: "left",
          marginRight: "1rem",
        }}
      >
     
        {characters?.map((character) => {
          return (
            <div key={character.id}>
              <Link
                to={characterRoute.id}
                params={{
                  characterId: character.id,
                }}
                activeProps={{ className: "font-bold" }}
              >
                <pre>{character.name.substring(0, 20)}</pre>
              </Link>
            </div>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
