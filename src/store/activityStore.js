import create from 'zustand';

const useStore = create((set) => ({
  activities: {
    activities: [],
    loader: true,
  },

  setActivities: (activities, loader) =>
    set((state) => ({
      activities: {
        activities,
        loader,
      },
    })),
  // removeActivity: (id) =>
  //   set((state) => ({
  //     activities: {
  //       activities: state.activities.activities.filter((act) => act._id !== id),
  //       loader: false,
  //     },
  //   })),
  //   removePokemon: (id) =>
  //     set((state) => ({
  //       pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
  //     })),
}));
export default useStore;
