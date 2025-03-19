import MainPage from '../pages/main-page/main-page';

type NumberOfRentals = {
  offersCount: number;
};

function App({ offersCount }: NumberOfRentals) {
  return <MainPage offersCount={offersCount} />;
}

export default App;
