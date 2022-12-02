
import {
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
  RouterProvider
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchCharacterById, fetchCharacters } from '../helpers';
import { Characters } from '../pages/characters/Characters';
import { CharactersIndex } from '../pages/characters/CharactersIndex';
import { Index } from '../pages/Index';
import { Character } from './Character';
import { Favorites } from './Favorites';
import { Spinner } from './Spinner';


// create a root config
const rootRoute = createRouteConfig();


// setup individual routes
const indexRoute = rootRoute.createRoute({
  path: "/",
  component: Index,
});

export const charactersRoute = rootRoute.createRoute({
  path: "characters",
  component: Characters,
  errorComponent: () => <div>Oh crap</div>,
  loader: async () => {
    return {
      characters: await fetchCharacters(),
    };
  },
});

const CharactersIndexRoute = charactersRoute.createRoute({
  path: "/",
  component: CharactersIndex,
});

export const characterRoute = charactersRoute.createRoute({
  path: "character/$characterId",
  component: Character,
  loader: async ({ params: { characterId } }) => {
    return {
      character: await fetchCharacterById(characterId),
    };
  },
});

export const favorites = rootRoute.createRoute({
  path: 'favorites',
  component: Favorites
})

const routeConfig = createRouteConfig().addChildren([
  indexRoute,
  charactersRoute.addChildren([CharactersIndexRoute, characterRoute]),
  favorites,
]);

// Set up a ReactRouter instance
const router = createReactRouter({
  routeConfig,
});

// inject "types"
declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}

export function App() {
  const routerState = router.useState();
  return (
    <div className='m-10'>
      <RouterProvider router={router} defaultPreload='intent'>
        <div className='flex gap-4 items-center'>
          <Link
            to='/'
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Dimension C-131
          </Link>
          <Link
            to='/characters'
            activeProps={{
              className: "font-bold",
            }}
          >
            Characters
          </Link>
          <Link
            to='/favorites'
            activeProps={{
              className: "font-bold",
            }}
          >
            Favorites
          </Link>
          {/* Show a global spinner when the router is transitioning */}
          <div
            className={`text-2xl duration-300 delay-0 opacity-0 ${
              routerState.isFetching ? ` duration-1000 opacity-40` : ""
            }`}
          >
            <Spinner />
          </div>
        </div>
        <hr />
        <Outlet /> {/* Start rendering router matches */}
        <TanStackRouterDevtools position='bottom-right' />
      </RouterProvider>
    </div>
  );
}
