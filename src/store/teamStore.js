import create from 'zustand';

const useStore = create((set) => ({

  users: {
    users: [],
    loader: true,
  },

  setUsers: (users, loader) =>
    set(() => ({
      users: {
        users,

        loader,
      },
    })),
  //   removePokemon: (id) =>
  //     set((state) => ({
  //       pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
  //     })),
}));
export default useStore;
