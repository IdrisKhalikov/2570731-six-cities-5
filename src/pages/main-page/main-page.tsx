import { Helmet } from 'react-helmet-async';
import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import CitiesList from '../../components/cities-list/cities-list';
import { City } from '../../types/city';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setCity } from '../../store/action';

export default function MainPage(): JSX.Element {
  const [activeCardId, setActiveCardById] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const offersForCurrentCity = offers.filter((offer) => offer.city.name === currentCity.name);

  const selectedOffer = offersForCurrentCity.find((offer) => offer.id === activeCardId);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={Object.values(City)}
            selectedCity={currentCity}
            onSelectChange={(selectedCity) => dispatch(setCity(selectedCity))}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersForCurrentCity.length} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList
                offers={offersForCurrentCity}
                onCardHover={setActiveCardById}
                onCardLeave={() => setActiveCardById(null)}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={currentCity}
                points={offersForCurrentCity}
                selectedPoint={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
